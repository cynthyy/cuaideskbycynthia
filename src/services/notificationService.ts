
export class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';

  private constructor() {
    this.permission = Notification.permission;
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return 'denied';
    }

    if (this.permission === 'granted') {
      return 'granted';
    }

    const permission = await Notification.requestPermission();
    this.permission = permission;
    return permission;
  }

  getPermission(): NotificationPermission {
    return this.permission;
  }

  showNotification(title: string, options: NotificationOptions = {}) {
    if (this.permission === 'granted') {
      new Notification(title, {
        icon: '/lovable-uploads/d7726cc8-b266-4fe1-b563-dbfcbbbf7e9c.png',
        badge: '/lovable-uploads/d7726cc8-b266-4fe1-b563-dbfcbbbf7e9c.png',
        ...options
      });
    }
  }

  isSupported(): boolean {
    return 'Notification' in window;
  }
}

export const notificationService = NotificationService.getInstance();
