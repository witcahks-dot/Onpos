'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ClientMountedOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientMountedOnly
 * Prevents hydration mismatch by rendering the children only after client-side mount.
 */
export function ClientMountedOnly({ children, fallback = null }: ClientMountedOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export default ClientMountedOnly;
