export type DistroType = 
  | 'Ubuntu' 
  | 'Debian' 
  | 'Arch' 
  | 'Fedora' 
  | 'NixOS' 
  | 'Flatpak' 
  | 'Snap' 
  | 'AppImage';

export interface InstallMethod {
  id: string;
  distro: DistroType;
  title?: string;
  command: string;
  verificationCommand?: string;
  isRecommended: boolean;
  isOfficial: boolean;
  sizeEstimate?: string;
  whyThisMethod: {
    summary: string;
    points: string[];
  };
  sourceUrl?: string;
}

export interface Problem {
  id: string;
  title: string;
  symptoms?: string[];
  cause: string;
  solution: string;
  commands: string[];
  verificationCommand?: string;
  explanation?: string;
  references?: { title: string; url: string }[];
}

export interface Alternative {
  id: string;
  name: string;
  slug?: string;
  tag: 'Best Alternative' | 'Lightweight Alternative' | 'Open-Source Alternative' | 'Commercial Alternative';
  whyItExists: string;
  compatibility: 'Excellent' | 'Good' | 'Moderate' | 'Limited';
  license: string;
  resourceUsage: 'Very Low' | 'Low' | 'Moderate' | 'High';
  pros: string[];
  cons: string[];
  installCommand?: string;
}

export interface ConfigFile {
  type: 'Configuration' | 'Cache' | 'Logs' | 'Data Directory' | 'Desktop Entry' | 'Binary Location' | 'Systemd Service';
  path: string;
  description: string;
}

export interface UninstallCommands {
  normal: {
    title: string;
    command: string;
    description: string;
  };
  removeConfig: {
    title: string;
    command: string;
    description: string;
  };
  completeCleanup: {
    title: string;
    command: string;
    description: string;
  };
}

export interface CommunityNote {
  id: string;
  author: string;
  date: string;
  content: string;
  distro?: string;
  upvotes: number;
}

export interface Playbook {
  slug: string;
  name: string;
  tagline: string;
  category: 'Productivity' | 'Development' | 'System & Drivers' | 'Graphics & Media' | 'Gaming' | 'Communication' | 'Unsupported / Proprietary';
  whyChoose: string[]; // e.g. ["Infinite scrolling workspace", "Wayland native", "Keyboard driven", "Lightweight"]
  isUnsupported?: boolean;
  unsupportedMessage?: string;
  overview: {
    whatIsIt: string;
    whoIsItFor: string;
    officialWebsite: string;
    version?: string;
    lastVerified?: string;
  };
  installMethods: InstallMethod[];
  problems: Problem[];
  alternatives: Alternative[];
  configFiles: ConfigFile[];
  uninstall: UninstallCommands;
  communityNotes: CommunityNote[];
  popularRank?: number;
  dateAdded?: string;
}
