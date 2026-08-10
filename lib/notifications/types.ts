export type AppNotificationKind = "due_soon" | "overdue";

export interface AppNotification {
  id: string;
  taskId: string;
  taskTitle: string;
  kind: AppNotificationKind;
  dueAt: string;
  createdAt: string;
  read: boolean;
}
