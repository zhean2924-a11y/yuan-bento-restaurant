import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

const BASE_URL = import.meta.env.BASE_URL.replace(/\/+$/, '') || '';

function getPathFromLocation(): string {
  // Support GitHub Pages 404 SPA redirect (?/about)
  const search = window.location.search;
  if (search.startsWith('?/')) {
    const redirectedPath = '/' + search.slice(2).split('&')[0].replace(/~and~/g, '&').replace(/\/+$/, '');
    if (['/about', '/menu', '/locations', '/news', '/contact', '/feedback', '/corporate'].includes(redirectedPath)) {
      return redirectedPath;
    }
  }

  let pathname = window.location.pathname;
  if (BASE_URL && pathname.startsWith(BASE_URL)) {
    pathname = pathname.slice(BASE_URL.length) || '/';
  }
  if (pathname && pathname !== '/') {
    const clean = pathname.replace(/\/+$/, '');
    if (['/about', '/menu', '/locations', '/news', '/contact', '/feedback', '/corporate'].includes(clean)) {
      return clean;
    }
  }
  const hash = window.location.hash.replace(/^#\/?/, '/');
  if (hash) {
    const clean = hash.replace(/\/+$/, '');
    if (['/about', '/menu', '/locations', '/news', '/contact', '/feedback', '/corporate'].includes(clean)) {
      return clean;
    }
  }
  return '/';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(getPathFromLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getPathFromLocation());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (to: string) => {
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('tel:') || to.startsWith('mailto:')) {
      window.open(to, '_blank', 'noopener,noreferrer');
      return;
    }

    let target = to;
    if (target !== '/' && target.endsWith('/')) {
      target = target.slice(0, -1);
    }

    try {
      const fullUrl = BASE_URL ? `${BASE_URL}${target === '/' ? '' : target}` || '/' : target;
      window.history.pushState({}, '', fullUrl);
    } catch {
      window.location.hash = target;
    }

    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  activeClassName?: string;
  children: ReactNode;
}

export function Link({ to, className = '', activeClassName = '', children, onClick, ...rest }: LinkProps) {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === to;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      navigate(to);
    }
  };

  const finalClass = `${className} ${isActive ? activeClassName : ''}`.trim();
  const href = BASE_URL ? `${BASE_URL}${to === '/' ? '' : to}` || '/' : to;

  return (
    <a href={href} className={finalClass} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
