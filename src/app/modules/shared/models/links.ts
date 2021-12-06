export enum AppLinksPath {
  USERS = 'users',
  LEARNINGS = 'learnings'
}

export interface AppLink {
  path: AppLinksPath;
  title: string;
}

export const AppLinks: AppLink[] = [
  {
    path: AppLinksPath.USERS,
    title: 'Users'
  },
  {
    path: AppLinksPath.LEARNINGS,
    title: 'Learnings'
  }
]
