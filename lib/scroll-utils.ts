"use client";

export function scrollToSectionCenter(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const targetTop = rect.top + window.scrollY;
  const targetHeight = rect.height;
  const viewportHeight = window.innerHeight;
  const navbarHeight = 72; // Fixed navbar height in px

  // Calculate the vertical midpoint of the visible space below the fixed navbar
  const viewportCenter = navbarHeight + (viewportHeight - navbarHeight) / 2;
  const contentCenterOffset = targetHeight / 2;

  // Target scroll Y aligns the section's true vertical midpoint with the viewport's vertical midpoint
  const targetY = targetTop + contentCenterOffset - viewportCenter;

  window.scrollTo({
    top: Math.max(0, targetY),
    behavior: "smooth",
  });
}

export function handleHashLinkClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onComplete?: () => void
) {
  if (href.includes("#")) {
    const hashParts = href.split("#");
    const targetId = hashParts[1];
    const pathPart = hashParts[0];

    const currentPath = window.location.pathname;

    // If on the same page (or pathPart is empty / "/"), scroll to section
    if (!pathPart || pathPart === "/" || pathPart === currentPath) {
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        scrollToSectionCenter(targetId);
        window.history.pushState(null, "", `#${targetId}`);
        if (onComplete) onComplete();

        // Second pass after smooth scroll completes to guarantee exact center positioning
        setTimeout(() => {
          scrollToSectionCenter(targetId);
        }, 350);
      }
    }
  }
}
