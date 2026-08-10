"use client";

import { usePathname } from "next/navigation";

interface RouteTransitionProps {
  children: React.ReactNode;
}

/**
 * Replays the enter animation whenever the route changes, which covers opening a
 * task, switching between tasks, and moving between the task and category views.
 *
 * This wrapper must stay sized to its content: the enter animation translates it
 * downwards, so stretching it to the scroll container's height would push it past
 * the bottom edge and flash a scrollbar on every navigation.
 */
export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="view-enter w-full shrink-0">
      {children}
    </div>
  );
}
