import { NextRequest, NextResponse } from 'next/server';
import { readCMSData, writeCMSData } from '@/lib/cms-db';
import { CMSData } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> }
) {
  try {
    const resolvedParams = await params;
    const entity = resolvedParams.entity;
    const data = readCMSData();

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
    const currentData = readCMSData();

    if (entity === 'quote-submit') {
      const newSubmission = {
        id: 'sub-' + Date.now(),
        createdAt: new Date().toLocaleString('tr-TR'),
        status: 'Yeni' as const,
        ...body,
      };
      const updatedSubmissions = [newSubmission, ...(currentData.submissions || [])];
      const newCMS = writeCMSData({ submissions: updatedSubmissions });
      return NextResponse.json(newSubmission, { status: 201 });
    }

    // If body itself is an Array (e.g. full replacement for homeSections, menu, etc.)
    if (Array.isArray(body)) {
      const arrayKey = entity as keyof CMSData;
      const newCMS = writeCMSData({ [arrayKey]: body });
      return NextResponse.json(newCMS[arrayKey], { status: 200 });
    }

    const currentEntityVal = (currentData as unknown as Record<string, unknown>)[entity];

    // If target entity is an Array and single item is being appended
    if (Array.isArray(currentEntityVal)) {
      const arrayKey = entity as keyof CMSData;
      const currentArray = (currentData[arrayKey] as unknown[]) || [];
      const newItem = { id: body.id || `${entity}-${Date.now()}`, ...body };
      const updatedArray = [newItem, ...currentArray];
      const newCMS = writeCMSData({ [arrayKey]: updatedArray });
      return NextResponse.json(newItem, { status: 201 });
    }

    // If target entity is an Object (e.g. corporateIntro, cloudPanel, settings)
    if (typeof currentEntityVal === 'object' && currentEntityVal !== null) {
      const objKey = entity as keyof CMSData;
      const updatedObj = { ...currentEntityVal, ...body };
      const newCMS = writeCMSData({ [objKey]: updatedObj });
      return NextResponse.json(newCMS[objKey], { status: 200 });
    }

    // If target entity doesn't exist yet, save it directly
    const newCMS = writeCMSData({ [entity]: body });
    return NextResponse.json(newCMS[entity as keyof CMSData], { status: 200 });
  } catch (error) {
    console.error('API POST error:', error);
    return NextResponse.json({ error: 'Failed to save item.' }, { status: 500 });
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
    const currentData = readCMSData();

    const currentEntityVal = (currentData as unknown as Record<string, unknown>)[entity];

    // If target entity is an Array
    if (Array.isArray(currentEntityVal)) {
      const arrayKey = entity as keyof CMSData;
      
      // Full array replacement (e.g. stats, reordered menu, reordered slides)
      if (Array.isArray(body)) {
        const newCMS = writeCMSData({ [arrayKey]: body });
        return NextResponse.json(newCMS[arrayKey]);
      }

      // Single item update inside array by id
      const currentArray = (currentData[arrayKey] as Array<{ id: string }>) || [];
      const updatedArray = currentArray.map(item => item.id === body.id ? { ...item, ...body } : item);
      const newCMS = writeCMSData({ [arrayKey]: updatedArray });
      return NextResponse.json(newCMS[arrayKey]);
    }

    // If target entity is an Object (e.g. corporateIntro, cloudPanel, settings)
    if (typeof currentEntityVal === 'object' && currentEntityVal !== null) {
      const objKey = entity as keyof CMSData;
      const updatedObj = { ...currentEntityVal, ...body };
      const newCMS = writeCMSData({ [objKey]: updatedObj });
      return NextResponse.json(newCMS[objKey]);
    }

    // Fallback: update entity directly
    const newCMS = writeCMSData({ [entity]: body });
    return NextResponse.json(newCMS[entity as keyof CMSData]);
  } catch (error) {
    console.error('API PUT error:', error);
    return NextResponse.json({ error: 'Failed to update item.' }, { status: 500 });
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
