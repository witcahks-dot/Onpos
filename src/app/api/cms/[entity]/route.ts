import { NextRequest, NextResponse } from 'next/server';
import { readCMSDataAsync, writeCMSDataAsync, readCMSData, writeCMSData } from '@/lib/cms-db';
import { CMSData } from '@/types';
import { quoteSubmissionSchema, newsletterSchema, settingsUpdateSchema } from '@/lib/validations';
import { normalizeSiteSettings } from '@/lib/data-normalizers';
import { ZodError } from 'zod';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> }
) {
  try {
    const resolvedParams = await params;
    const entity = resolvedParams.entity;
    const data = await readCMSDataAsync();

    if (entity === 'all') {
      return NextResponse.json(data);
    }

    if (entity in data) {
      const key = entity as keyof CMSData;
      return NextResponse.json(data[key]);
    }

    return NextResponse.json({ error: `Entity '${entity}' not found.` }, { status: 404 });
  } catch (error) {
    console.error('API GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch CMS data.' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> }
) {
  try {
    const resolvedParams = await params;
    const entity = resolvedParams.entity;
    const body = await req.json();
    const currentData = await readCMSDataAsync();

    // 1. Validated Lead & Quote Form Submission
    if (entity === 'quote-submit') {
      const validatedData = quoteSubmissionSchema.parse(body);
      const newSubmission = {
        id: 'sub-' + Date.now(),
        createdAt: new Date().toLocaleString('tr-TR'),
        status: 'Yeni' as const,
        ...validatedData,
      };
      const updatedSubmissions = [newSubmission, ...(currentData.submissions || [])];
      await writeCMSDataAsync({ submissions: updatedSubmissions });
      return NextResponse.json({ success: true, message: 'Başvurunuz başarıyla kaydedildi.', data: newSubmission }, { status: 201 });
    }

    // 2. Validated Newsletter Subscription
    if (entity === 'subscribers' && body && typeof body === 'object' && 'email' in body) {
      const validatedNewsletter = newsletterSchema.parse(body);
      const currentSubs = currentData.subscribers || [];
      const exists = currentSubs.some(s => s.email.toLowerCase() === validatedNewsletter.email.toLowerCase());
      if (exists) {
        return NextResponse.json({ success: true, message: 'Bu e-posta adresi zaten bültenimize kayıtlı.' }, { status: 200 });
      }
      const newSubscriber = {
        id: 'sub-news-' + Date.now(),
        email: validatedNewsletter.email,
        createdAt: new Date().toLocaleString('tr-TR'),
      };
      const updatedSubs = [newSubscriber, ...currentSubs];
      await writeCMSDataAsync({ subscribers: updatedSubs });
      return NextResponse.json({ success: true, message: 'Bülten kaydınız başarıyla oluşturuldu.', data: newSubscriber }, { status: 201 });
    }

    // 3. Settings Entity Special Write-Through
    if (entity === 'settings') {
      const validatedSettings = settingsUpdateSchema.parse(body);
      const updatedSettings = normalizeSiteSettings({ ...(currentData.settings || {}), ...validatedSettings });
      const newCMS = await writeCMSDataAsync({ settings: updatedSettings });
      
      try {
        revalidatePath('/', 'layout');
      } catch (revErr) {
        console.warn('Revalidate error:', revErr);
      }

      const res = NextResponse.json(newCMS.settings, { status: 200 });
      if (newCMS.settings?.themeId) {
        res.cookies.set('paypos_theme_id', newCMS.settings.themeId, { path: '/', maxAge: 31536000, sameSite: 'lax' });
      }
      return res;
    }

    // If body itself is an Array (e.g. full replacement for homeSections, menu, etc.)
    if (Array.isArray(body)) {
      const arrayKey = entity as keyof CMSData;
      const newCMS = await writeCMSDataAsync({ [arrayKey]: body });
      return NextResponse.json(newCMS[arrayKey], { status: 200 });
    }

    const currentEntityVal = (currentData as unknown as Record<string, unknown>)[entity];

    // If target entity is an Array and single item is being appended
    if (Array.isArray(currentEntityVal)) {
      const arrayKey = entity as keyof CMSData;
      const currentArray = (currentData[arrayKey] as unknown[]) || [];
      const newItem = { id: body.id || `${entity}-${Date.now()}`, ...body };
      const updatedArray = [newItem, ...currentArray];
      const newCMS = await writeCMSDataAsync({ [arrayKey]: updatedArray });
      return NextResponse.json(newItem, { status: 201 });
    }

    // If target entity is an Object (e.g. corporateIntro, cloudPanel)
    if (typeof currentEntityVal === 'object' && currentEntityVal !== null) {
      const objKey = entity as keyof CMSData;
      const updatedObj = { ...currentEntityVal, ...body };
      const newCMS = await writeCMSDataAsync({ [objKey]: updatedObj });
      return NextResponse.json(newCMS[objKey], { status: 200 });
    }

    // If target entity doesn't exist yet, save it directly
    const newCMS = await writeCMSDataAsync({ [entity]: body });
    return NextResponse.json(newCMS[entity as keyof CMSData], { status: 200 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
      const firstErrorMessage = Object.values(fieldErrors).flat()[0] || 'Girilen bilgiler doğrulanamadı.';
      return NextResponse.json(
        { success: false, message: firstErrorMessage, errors: fieldErrors },
        { status: 400 }
      );
    }
    console.error('API POST error:', error);
    const msg = error instanceof Error ? error.message : 'İşlem sırasında bir hata oluştu.';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> }
) {
  try {
    const resolvedParams = await params;
    const entity = resolvedParams.entity;
    const body = await req.json();
    const currentData = await readCMSDataAsync();

    // Settings Entity Special Write-Through
    if (entity === 'settings') {
      const validatedSettings = settingsUpdateSchema.parse(body);
      const updatedSettings = normalizeSiteSettings({ ...(currentData.settings || {}), ...validatedSettings });
      const newCMS = await writeCMSDataAsync({ settings: updatedSettings });
      
      try {
        revalidatePath('/', 'layout');
      } catch (revErr) {
        console.warn('Revalidate error:', revErr);
      }

      const res = NextResponse.json(newCMS.settings, { status: 200 });
      if (newCMS.settings?.themeId) {
        res.cookies.set('paypos_theme_id', newCMS.settings.themeId, { path: '/', maxAge: 31536000, sameSite: 'lax' });
      }
      return res;
    }

    const currentEntityVal = (currentData as unknown as Record<string, unknown>)[entity];

    // If target entity is an Array
    if (Array.isArray(currentEntityVal)) {
      const arrayKey = entity as keyof CMSData;
      
      // Full array replacement (e.g. stats, reordered menu, reordered slides)
      if (Array.isArray(body)) {
        const newCMS = await writeCMSDataAsync({ [arrayKey]: body });
        return NextResponse.json(newCMS[arrayKey]);
      }

      // Single item update inside array by id
      const currentArray = (currentData[arrayKey] as Array<{ id: string }>) || [];
      const updatedArray = currentArray.map(item => item.id === body.id ? { ...item, ...body } : item);
      const newCMS = await writeCMSDataAsync({ [arrayKey]: updatedArray });
      return NextResponse.json(newCMS[arrayKey]);
    }

    // If target entity is an Object (e.g. corporateIntro, cloudPanel)
    if (typeof currentEntityVal === 'object' && currentEntityVal !== null) {
      const objKey = entity as keyof CMSData;
      const updatedObj = { ...currentEntityVal, ...body };
      const newCMS = await writeCMSDataAsync({ [objKey]: updatedObj });
      return NextResponse.json(newCMS[objKey]);
    }

    // Fallback: update entity directly
    const newCMS = await writeCMSDataAsync({ [entity]: body });
    return NextResponse.json(newCMS[entity as keyof CMSData]);
  } catch (error: unknown) {
    console.error('API PUT error:', error);
    const msg = error instanceof Error ? error.message : 'Failed to update item.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> }
) {
  try {
    const resolvedParams = await params;
    const entity = resolvedParams.entity;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing item id query parameter.' }, { status: 400 });
    }

    const currentData = readCMSData();
    const currentEntityVal = (currentData as unknown as Record<string, unknown>)[entity];

    if (Array.isArray(currentEntityVal)) {
      const arrayKey = entity as keyof CMSData;
      const currentArray = (currentData[arrayKey] as Array<{ id: string }>) || [];
      const updatedArray = currentArray.filter(item => item.id !== id);
      const newCMS = writeCMSData({ [arrayKey]: updatedArray });
      return NextResponse.json(newCMS[arrayKey]);
    }

    return NextResponse.json({ error: `Invalid DELETE target entity '${entity}'` }, { status: 400 });
  } catch (error) {
    console.error('API DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete item.' }, { status: 500 });
  }
}
