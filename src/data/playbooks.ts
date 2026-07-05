import { Playbook } from '../types/playbook';

export const PLAYBOOKS: Playbook[] = [
  {
    slug: 'niri',
    name: 'Niri',
    tagline: 'A scrollable-tiling Wayland compositor.',
    category: 'System & Drivers',
    whyChoose: [
      'Infinite scrolling ribbon workspace',
      'Wayland native architecture',
      'Keyboard driven workflow',
      'Extremely lightweight & fast',
      'No desktop environment bloat required'
    ],
    overview: {
      whatIsIt: 'Niri is a modern, scrollable-tiling Wayland compositor inspired by PaperWM. Instead of a fixed grid, windows arrange in an infinite horizontal ribbon that you scroll through smoothly.',
      whoIsItFor: 'Power users and developers running Ubuntu 24.04 Server / Headless who want a keyboard-centric, hyper-fast, modern Wayland graphical environment without installing heavy desktop environments like GNOME or KDE.',
      officialWebsite: 'https://github.com/YaLTeR/niri',
      version: 'Latest Release',
      lastVerified: 'Ubuntu 24.04 LTS (Headless)'
    },
    installMethods: [
      {
        id: 'ubuntu-cargo',
        distro: 'Ubuntu',
        command: `sudo apt update && sudo apt install -y build-essential curl wget git pkg-config cmake meson ninja-build ca-certificates libwayland-dev libxkbcommon-dev libinput-dev libdisplay-info-dev libseat-dev libpixman-1-dev libgbm-dev libegl1-mesa-dev libpipewire-0.3-dev libpango1.0-dev libglib2.0-dev libdbus-1-dev libsystemd-dev wayland-protocols libxcb-cursor-dev clang libclang-dev
cd ~
git clone https://github.com/YaLTeR/niri.git
cd niri
cargo clean
cargo build --release
sudo install -Dm755 target/release/niri /usr/local/bin/niri`,
        verificationCommand: `niri --version`,
        isRecommended: true,
        isOfficial: true,
        sizeEstimate: '~45 MB (binary)',
        whyThisMethod: {
          summary: 'Compiling directly via Cargo on Ubuntu 24.04 guarantees exact Wayland protocol binding and peak hardware rendering performance.',
          points: [
            'Official source repository',
            'Installs all necessary Wayland & systemd headers',
            'Standalone optimized binary in /usr/local/bin',
            'Tested for minimal headless Ubuntu setups'
          ]
        },
        sourceUrl: 'https://github.com/YaLTeR/niri'
      },
      {
        id: 'arch-pacman',
        distro: 'Arch',
        command: `sudo pacman -Syu --needed niri xdg-desktop-portal-gnome waybar alacritty`,
        verificationCommand: `niri --version`,
        isRecommended: true,
        isOfficial: true,
        sizeEstimate: '~12 MB',
        whyThisMethod: {
          summary: 'Arch Linux maintains Niri directly in its official Extra repository with zero build time required.',
          points: [
            'Instant binary installation via pacman',
            'Automatic dependency resolution for Wayland protocols',
            'Rolling release always ships the latest upstream release'
          ]
        },
        sourceUrl: 'https://archlinux.org/packages/extra/x86_64/niri/'
      },
      {
        id: 'fedora-copr',
        distro: 'Fedora',
        command: `sudo dnf copr enable -y yalter/niri && sudo dnf install -y niri`,
        verificationCommand: `niri --version`,
        isRecommended: true,
        isOfficial: false,
        sizeEstimate: '~15 MB',
        whyThisMethod: {
          summary: 'Official upstream COPR repository maintained by Niri creator YaLTeR for Fedora Workstation/Server.',
          points: [
            'Maintained directly by upstream author YaLTeR',
            'Precompiled RPM binaries optimized for Fedora',
            'Seamless integration with systemd user sessions'
          ]
        },
        sourceUrl: 'https://copr.fedorainfracloud.org/coprs/yalter/niri/'
      }
    ],
    problems: [
      {
        id: 'xwayland-missing',
        title: 'Legacy X11 apps fail to launch or crash on start',
        symptoms: ['X11 apps fail silently', 'Error: cannot open display :0', 'Electron/Chromium apps crash without Wayland flags'],
        cause: 'Niri is a pure Wayland compositor and does not run a full root-level XWayland server by default.',
        solution: 'Install and run xwayland-satellite to act as an on-demand rootless bridge for legacy X11 applications.',
        commands: [
          'git clone https://github.com/Supreeeme/xwayland-satellite.git',
          'cd xwayland-satellite && cargo build --release',
          'sudo install -Dm755 target/release/xwayland-satellite /usr/local/bin/xwayland-satellite'
        ],
        verificationCommand: `xwayland-satellite --version`,
        explanation: 'xwayland-satellite manages XWayland on demand without requiring root compositor privileges.',
        references: [{ title: 'XWayland Satellite GitHub', url: 'https://github.com/Supreeeme/xwayland-satellite' }]
      },
      {
        id: 'unattended-upgrades-lock',
        title: 'apt install fails with "Could not get lock /var/lib/dpkg/lock-frontend"',
        symptoms: ['E: Could not get lock /var/lib/dpkg/lock-frontend', 'apt-get hangs indefinitely on boot'],
        cause: 'Ubuntu 24.04 Server automatically runs unattended-upgrades in the background after boot.',
        solution: 'Stop and disable the unattended-upgrades service immediately.',
        commands: [
          'sudo systemctl stop unattended-upgrades',
          'sudo systemctl disable unattended-upgrades'
        ],
        verificationCommand: `systemctl status unattended-upgrades | grep Active`,
        explanation: 'Disabling automated upgrades gives you deterministic control over when package updates occur.'
      }
    ],
    alternatives: [
      {
        id: 'sway',
        name: 'Sway',
        tag: 'Open-Source Alternative',
        whyItExists: 'i3-compatible tiling Wayland compositor for traditional grid/tree tiling.',
        compatibility: 'Excellent',
        license: 'MIT',
        resourceUsage: 'Very Low',
        pros: ['Drop-in i3 config replacement', 'Mature ecosystem', 'Extremely lightweight'],
        cons: ['Manual grid splitting required', 'No infinite scroll ribbon'],
        installCommand: 'sudo apt install sway'
      },
      {
        id: 'hyprland',
        name: 'Hyprland',
        tag: 'Best Alternative',
        whyItExists: 'Dynamic tiling Wayland compositor with fluid animations and rounded corners.',
        compatibility: 'Good',
        license: 'BSD-3-Clause',
        resourceUsage: 'Low',
        pros: ['Stunning animations out of the box', 'Huge community', 'Rich IPC'],
        cons: ['Frequent breaking changes in updates', 'Heavier on GPU'],
        installCommand: 'sudo apt install hyprland'
      }
    ],
    configFiles: [
      { type: 'Configuration', path: '~/.config/niri/config.kdl', description: 'Main Niri layout, keybindings, and output settings (KDL syntax).' },
      { type: 'Logs', path: '~/.cache/niri/niri.log', description: 'Runtime compositor logs and Wayland protocol error traces.' },
      { type: 'Binary Location', path: '/usr/local/bin/niri', description: 'Compiled executable installed via Cargo.' }
    ],
    uninstall: {
      normal: { title: 'Remove Binary', command: 'sudo rm -f /usr/local/bin/niri', description: 'Deletes the main Niri executable from local binaries.' },
      removeConfig: { title: 'Delete Configuration', command: 'rm -rf ~/.config/niri ~/.cache/niri', description: 'Removes user configuration and cached log files.' },
      completeCleanup: { title: 'Full System Cleanup', command: 'sudo rm -f /usr/local/bin/niri && rm -rf ~/.config/niri ~/.cache/niri ~/niri', description: 'Removes binary, source repository, and all user configs.' }
    },
    communityNotes: [
      { id: '1', author: 'harsha', date: '2026-07-05', content: 'On Ubuntu 24.04 Server headless, make sure to install libseat-dev and libdisplay-info-dev before running cargo build --release otherwise meson fails!', upvotes: 24 }
    ],
    popularRank: 1
  },
  {
    slug: 'zen-browser',
    name: 'Zen Browser',
    tagline: 'Beautiful, privacy-focused desktop browser based on Firefox.',
    category: 'Productivity',
    whyChoose: [
      'Built on stable Firefox engine',
      'Zero telemetry or background tracking',
      'Vertical tabs & split view workspaces',
      'Ultra-responsive keyboard navigation'
    ],
    overview: {
      whatIsIt: 'Zen Browser is a modern, hyper-fast web browser built on Firefox. It features vertical tabs, split views, workspaces, and zero telemetry with an aesthetic interface.',
      whoIsItFor: 'Users who want an ultra-responsive, keyboard-friendly alternative to Chrome/Edge without sacrificing privacy or extension compatibility.',
      officialWebsite: 'https://zen-browser.app',
      version: 'Latest Stable',
      lastVerified: 'Ubuntu 24.04 LTS'
    },
    installMethods: [
      {
        id: 'official-script',
        distro: 'Ubuntu',
        command: `curl -fsSL https://github.com/zen-browser/updates-server/raw/refs/heads/main/install.sh | bash`,
        verificationCommand: `~/.local/bin/zen --version`,
        isRecommended: true,
        isOfficial: true,
        sizeEstimate: '~210 MB',
        whyThisMethod: {
          summary: 'Official automated installer script sets up optimized binaries and creates desktop application menu shortcuts.',
          points: [
            'Official installer script',
            'Automatic updates via built-in updater',
            'Installs cleanly to ~/.tarball-installations/zen/zen',
            'Creates symlink in ~/.local/bin/zen'
          ]
        },
        sourceUrl: 'https://github.com/zen-browser'
      }
    ],
    problems: [
      {
        id: 'wayland-scaling',
        title: 'Blurry fonts or incorrect UI scaling on Wayland displays',
        symptoms: ['Text appears fuzzy on HiDPI screens', 'Window scaling does not match compositor setup'],
        cause: 'Firefox/Zen may default to XWayland if the environment variable MOZ_ENABLE_WAYLAND is not explicitly exported.',
        solution: 'Export MOZ_ENABLE_WAYLAND=1 in your shell configuration.',
        commands: [
          'echo "set -gx MOZ_ENABLE_WAYLAND 1" >> ~/.config/fish/config.fish',
          '# Or for bash/zsh:',
          'echo "export MOZ_ENABLE_WAYLAND=1" >> ~/.profile'
        ],
        verificationCommand: `echo $MOZ_ENABLE_WAYLAND`,
        explanation: 'Enabling Wayland natively allows Zen to render crisp fonts and handle touchscreen/touchpad gestures smoothly.'
      }
    ],
    alternatives: [
      {
        id: 'chromium',
        name: 'Chromium',
        tag: 'Open-Source Alternative',
        whyItExists: 'Open-source foundation for Google Chrome with universal web compatibility.',
        compatibility: 'Excellent',
        license: 'BSD-3-Clause',
        resourceUsage: 'Moderate',
        pros: ['100% web compatibility', 'Fast V8 engine', 'Extensive devtools'],
        cons: ['Heavy memory usage', 'No native vertical tabs out of box'],
        installCommand: 'sudo apt install chromium-browser'
      },
      {
        id: 'brave',
        name: 'Brave Browser',
        tag: 'Best Alternative',
        whyItExists: 'Chromium-based privacy browser with built-in ad blocking.',
        compatibility: 'Excellent',
        license: 'MPL-2.0',
        resourceUsage: 'Moderate',
        pros: ['Aggressive native ad blocker', 'Chrome extension support'],
        cons: ['Crypto wallet integration bloat'],
        installCommand: 'sudo apt install brave-browser'
      }
    ],
    configFiles: [
      { type: 'Binary Location', path: '~/.local/bin/zen', description: 'Symlink to executable.' },
      { type: 'Data Directory', path: '~/.tarball-installations/zen', description: 'Main application installation folder.' },
      { type: 'Configuration', path: '~/.mozilla/zen or ~/.zen', description: 'User profile, bookmarks, and extension data.' }
    ],
    uninstall: {
      normal: { title: 'Remove Symlink & App', command: 'rm -f ~/.local/bin/zen && rm -rf ~/.tarball-installations/zen', description: 'Removes the browser binaries and command line shortcut.' },
      removeConfig: { title: 'Delete Profiles', command: 'rm -rf ~/.zen ~/.cache/zen', description: 'Deletes all user profiles, history, and cache.' },
      completeCleanup: { title: 'Complete Purge', command: 'rm -f ~/.local/bin/zen && rm -rf ~/.tarball-installations/zen ~/.zen ~/.cache/zen', description: 'Removes all traces of Zen Browser from the system.' }
    },
    communityNotes: [
      { id: '2', author: 'harsha', date: '2026-07-05', content: 'Works beautifully on Niri tiling window manager without any graphical artifacts!', upvotes: 18 }
    ],
    popularRank: 2
  },
  {
    slug: 'neovim',
    name: 'Neovim (Kickstart)',
    tagline: 'Hyperextensible Vim-based text editor built for modern terminal workflows.',
    category: 'Development',
    whyChoose: [
      '100% terminal-native IDE experience',
      'Built-in Language Server Protocol (LSP)',
      'Blazing fast ~5ms startup times',
      'Kickstart Lua modular architecture',
      'Zero GUI memory overhead'
    ],
    overview: {
      whatIsIt: 'Neovim is a refactored, modern Vim distribution with built-in Language Server Protocol (LSP) support, Lua scripting, and asynchronous plugin execution.',
      whoIsItFor: 'Developers who want an IDE-level editing experience entirely inside the terminal with lightning-fast startup times.',
      officialWebsite: 'https://neovim.io',
      version: 'v0.10+ (Latest Release)',
      lastVerified: 'Ubuntu 24.04 LTS'
    },
    installMethods: [
      {
        id: 'tarball-kickstart',
        distro: 'Ubuntu',
        command: `cd /tmp
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux-x86_64.tar.gz
sudo rm -rf /opt/nvim
sudo tar -C /opt -xzf nvim-linux-x86_64.tar.gz
sudo ln -sf /opt/nvim-linux-x86_64/bin/nvim /usr/local/bin/nvim
mv ~/.config/nvim ~/.config/nvim.bak 2>/dev/null
git clone https://github.com/nvim-lua/kickstart.nvim.git ~/.config/nvim
cargo install tree-sitter-cli`,
        verificationCommand: `nvim --version && tree-sitter --version`,
        isRecommended: true,
        isOfficial: true,
        sizeEstimate: '~35 MB',
        whyThisMethod: {
          summary: 'Bypasses outdated Ubuntu apt repositories to provide the latest v0.10+ release with pre-configured Kickstart LSP & Treesitter.',
          points: [
            'Latest official GitHub release binary in /opt/nvim',
            'Clones Kickstart.nvim for instant LSP & Treesitter setup',
            'Installs tree-sitter-cli via Cargo for grammar compilation',
            'Backs up existing config automatically'
          ]
        },
        sourceUrl: 'https://github.com/neovim/neovim'
      }
    ],
    problems: [
      {
        id: 'treesitter-cli-missing',
        title: 'Tree-sitter parsers fail to compile when opening source files',
        symptoms: ['Error during compilation', 'tree-sitter executable not found', 'Syntax highlighting falls back to plain text'],
        cause: 'Kickstart.nvim requires a C compiler and the tree-sitter CLI tool installed in your PATH to compile syntax grammars on demand.',
        solution: 'Install build-essential via apt and tree-sitter-cli via Cargo or npm.',
        commands: [
          'sudo apt install -y build-essential',
          'cargo install tree-sitter-cli'
        ],
        verificationCommand: `tree-sitter --version`,
        explanation: 'With a C compiler and CLI ready, running :TSUpdate in Neovim will seamlessly compile all grammars.'
      },
      {
        id: 'clipboard-provider',
        title: 'System clipboard (+ and * registers) not working over Wayland or SSH',
        symptoms: ['Yanking text in nvim does not paste into system browser', 'Error: No clipboard tool found'],
        cause: 'Neovim relies on external clipboard utilities like wl-clipboard (Wayland) or xclip (X11) to interact with OS clipboards.',
        solution: 'Install wl-clipboard and cliphist for native Wayland support.',
        commands: [
          'sudo apt install -y wl-clipboard cliphist'
        ],
        verificationCommand: `wl-copy --version`,
        explanation: 'Once installed, Neovim automatically detects wl-copy / wl-paste without any Lua configuration changes.'
      }
    ],
    alternatives: [
      {
        id: 'vscode',
        name: 'Visual Studio Code',
        tag: 'Best Alternative',
        whyItExists: 'Full graphical code editor with unmatched extension marketplace.',
        compatibility: 'Excellent',
        license: 'MIT (VSCodium) / Proprietary',
        resourceUsage: 'Moderate',
        pros: ['Zero configuration required', 'GUI debugging features', 'Remote SSH workspace'],
        cons: ['Heavier electron RAM footprint', 'Requires GUI window'],
        installCommand: 'sudo apt install code'
      },
      {
        id: 'helix',
        name: 'Helix Editor',
        tag: 'Lightweight Alternative',
        whyItExists: 'Post-modern modal text editor built in Rust with batteries-included LSP/Treesitter.',
        compatibility: 'Excellent',
        license: 'MPL-2.0',
        resourceUsage: 'Very Low',
        pros: ['No plugins needed—LSP & treesitter built-in', 'Multiple cursors natively'],
        cons: ['Selection-first grammar differs from traditional Vim'],
        installCommand: 'sudo apt install helix'
      }
    ],
    configFiles: [
      { type: 'Configuration', path: '~/.config/nvim/init.lua', description: 'Main Lua configuration entry point (Kickstart.nvim).' },
      { type: 'Data Directory', path: '~/.local/share/nvim', description: 'Installed plugins, Mason LSP servers, and compiled Treesitter parsers.' },
      { type: 'Cache', path: '~/.cache/nvim', description: 'Log files, undo history, and swap storage.' },
      { type: 'Binary Location', path: '/usr/local/bin/nvim', description: 'Symlink pointing to /opt/nvim-linux-x86_64/bin/nvim.' }
    ],
    uninstall: {
      normal: { title: 'Remove Binaries', command: 'sudo rm -rf /opt/nvim /opt/nvim-linux-x86_64 && sudo rm -f /usr/local/bin/nvim', description: 'Deletes core Neovim binaries and symlink.' },
      removeConfig: { title: 'Delete Configuration', command: 'rm -rf ~/.config/nvim ~/.local/share/nvim ~/.local/state/nvim ~/.cache/nvim', description: 'Removes Kickstart config, installed LSP servers, and plugins.' },
      completeCleanup: { title: 'Complete Purge', command: 'sudo rm -rf /opt/nvim* /usr/local/bin/nvim && rm -rf ~/.config/nvim ~/.local/share/nvim ~/.local/state/nvim ~/.cache/nvim', description: 'Completely wipes Neovim from system.' }
    },
    communityNotes: [
      { id: '3', author: 'harsha', date: '2026-07-05', content: 'If you want to restore your old configuration, check ~/.config/nvim.bak created during installation!', upvotes: 31 }
    ],
    popularRank: 3
  },
  {
    slug: 'pipewire',
    name: 'PipeWire Audio Stack',
    tagline: 'Low-latency multimedia server for audio and video routing on Linux.',
    category: 'System & Drivers',
    whyChoose: [
      'Modern replacement for PulseAudio & JACK',
      'Flawless Wayland screen share capture',
      'Intelligent Bluetooth codec switching',
      'Ultra low latency for professional audio'
    ],
    overview: {
      whatIsIt: 'PipeWire is the modern Linux multimedia server replacing PulseAudio and JACK. It provides seamless Bluetooth audio, pro-audio JACK compatibility, and Wayland screen-sharing capture via WirePlumber.',
      whoIsItFor: 'Every modern Linux user. Essential for Wayland screen sharing, Bluetooth headphones, and glitch-free audio routing.',
      officialWebsite: 'https://pipewire.org',
      version: 'v1.0+',
      lastVerified: 'Ubuntu 24.04 LTS'
    },
    installMethods: [
      {
        id: 'ubuntu-apt',
        distro: 'Ubuntu',
        command: `sudo apt update && sudo apt install -y pipewire wireplumber pipewire-pulse pipewire-alsa libspa-0.2-bluetooth pulseaudio-utils
systemctl --user enable --now pipewire.socket
systemctl --user enable --now pipewire-pulse.socket
systemctl --user enable --now wireplumber.service`,
        verificationCommand: `pactl info | grep "Server Name"`,
        isRecommended: true,
        isOfficial: true,
        sizeEstimate: '~15 MB',
        whyThisMethod: {
          summary: 'Installs the complete PipeWire stack with PulseAudio and ALSA emulation layers directly from official Ubuntu repositories.',
          points: [
            'Official Ubuntu repositories',
            'Enables user systemd background sockets',
            'Includes WirePlumber intelligent session manager',
            'Retains pulseaudio-utils for legacy pactl compatibility'
          ]
        },
        sourceUrl: 'https://gitlab.freedesktop.org/pipewire/pipewire'
      }
    ],
    problems: [
      {
        id: 'no-audio-device',
        title: 'No audio output detected or dummy output shown after boot',
        symptoms: ['Dummy Output displayed in volume control', 'pactl info shows connection refused', 'No audio playing'],
        cause: 'WirePlumber session manager service failed to start or is masked by old PulseAudio daemons.',
        solution: 'Restart the user systemd audio sockets and verify WirePlumber status.',
        commands: [
          'systemctl --user restart pipewire.service pipewire-pulse.service wireplumber.service',
          'systemctl --user status wireplumber.service'
        ],
        verificationCommand: `pactl list short sinks`,
        explanation: 'WirePlumber is responsible for discovering hardware audio endpoints and routing them to PipeWire.'
      }
    ],
    alternatives: [
      {
        id: 'pulseaudio',
        name: 'PulseAudio',
        tag: 'Open-Source Alternative',
        whyItExists: 'The legacy Linux sound server used for over a decade.',
        compatibility: 'Good',
        license: 'LGPL-2.1',
        resourceUsage: 'Low',
        pros: ['Decades of documentation', 'Simple network streaming'],
        cons: ['High latency for pro audio', 'Poor Wayland screen sharing integration'],
        installCommand: 'sudo apt install pulseaudio'
      }
    ],
    configFiles: [
      { type: 'Configuration', path: '~/.config/pipewire/ or /usr/share/pipewire/', description: 'PipeWire daemon settings and sample rate rules.' },
      { type: 'Configuration', path: '~/.config/wireplumber/ or /usr/share/wireplumber/', description: 'WirePlumber audio policy and Bluetooth codec preferences.' },
      { type: 'Systemd Service', path: '/usr/lib/systemd/user/pipewire.service', description: 'User-level systemd service file.' }
    ],
    uninstall: {
      normal: { title: 'Disable Sockets', command: 'systemctl --user disable --now pipewire.socket pipewire-pulse.socket wireplumber.service', description: 'Stops running background audio services.' },
      removeConfig: { title: 'Remove Packages', command: 'sudo apt remove --purge -y pipewire wireplumber pipewire-pulse pipewire-alsa', description: 'Uninstalls PipeWire packages from system.' },
      completeCleanup: { title: 'Full Audio Wipout', command: 'systemctl --user disable --now pipewire.socket pipewire-pulse.socket wireplumber.service && sudo apt remove --purge -y pipewire* wireplumber* && rm -rf ~/.config/pipewire ~/.config/wireplumber', description: 'Disables services, removes packages, and deletes custom user audio profiles.' }
    },
    communityNotes: [
      { id: '4', author: 'harsha', date: '2026-07-05', content: 'Always check that unattended-upgrades is disabled so audio services do not get restarted mid-session!', upvotes: 12 }
    ],
    popularRank: 4
  },
  {
    slug: 'fish-shell',
    name: 'Fish Shell & Zoxide',
    tagline: 'Friendly interactive command line shell with smart auto-jumping.',
    category: 'System & Drivers',
    whyChoose: [
      'Smart syntax highlighting out of the box',
      'History-based auto-suggestions without plugins',
      'Fuzzy directory jumping with zoxide (z command)',
      'Zero dotfiles configuration bloat'
    ],
    overview: {
      whatIsIt: 'Fish (Friendly Interactive Shell) is a smart command line shell with out-of-the-box syntax highlighting, auto-suggestions based on history, and web-based configuration. Paired with Zoxide, it allows instant directory jumping using fuzzy keywords.',
      whoIsItFor: 'Developers and terminal enthusiasts who want modern shell productivity without spending hours tweaking complex bash/zsh dotfiles.',
      officialWebsite: 'https://fishshell.com',
      version: 'v3.6+',
      lastVerified: 'Ubuntu 24.04 LTS'
    },
    installMethods: [
      {
        id: 'ubuntu-fish-zoxide',
        distro: 'Ubuntu',
        command: `sudo apt update && sudo apt install -y fish zoxide
mkdir -p ~/.config/fish
echo 'zoxide init fish | source' >> ~/.config/fish/config.fish
chsh -s $(which fish)`,
        verificationCommand: `fish --version && zoxide --version`,
        isRecommended: true,
        isOfficial: true,
        sizeEstimate: '~25 MB',
        whyThisMethod: {
          summary: 'Installs Fish and Zoxide cleanly via apt, initializes Zoxide auto-jump hook, and sets Fish as your default login shell.',
          points: [
            'Official Ubuntu repository packages',
            'Automatically configures zoxide init hook in config.fish',
            'Sets default login shell via chsh',
            'Zero external script downloads'
          ]
        },
        sourceUrl: 'https://fishshell.com'
      }
    ],
    problems: [
      {
        id: 'bash-incompatibility',
        title: 'Bash scripts or commands fail with syntax errors when copied into terminal',
        symptoms: ['export VAR=val fails with unsupported command', 'source script.sh fails or does nothing', 'Error: && or || behaving unexpectedly in older fish versions'],
        cause: 'Fish syntax is deliberately not POSIX/Bash compatible (e.g., uses set -gx instead of export).',
        solution: 'Run bash scripts explicitly with bash command or use set -gx.',
        commands: [
          '# To run a bash script:',
          'bash ./script.sh',
          '# To set an environment variable in fish:',
          'set -gx MY_VAR "my value"'
        ],
        verificationCommand: `echo $MY_VAR`,
        explanation: 'For bash scripts that modify environment variables, install the bass plugin or use conf.d scripts.'
      }
    ],
    alternatives: [
      {
        id: 'zsh',
        name: 'Zsh + Oh My Zsh',
        tag: 'Open-Source Alternative',
        whyItExists: 'POSIX-compatible shell with massive plugin framework.',
        compatibility: 'Excellent',
        license: 'MIT',
        resourceUsage: 'Moderate',
        pros: ['100% POSIX/bash script compatible', 'Thousands of themes and plugins'],
        cons: ['Can become slow on startup without optimization', 'Requires configuration for auto-suggest'],
        installCommand: 'sudo apt install zsh'
      }
    ],
    configFiles: [
      { type: 'Configuration', path: '~/.config/fish/config.fish', description: 'Main user configuration file (aliases, zoxide init, custom prompts).' },
      { type: 'Configuration', path: '~/.config/fish/conf.d/', description: 'Directory for modular startup snippets (e.g., fnm.fish, env vars).' },
      { type: 'Data Directory', path: '~/.local/share/zoxide/', description: 'Zoxide directory frequency and jump database.' },
      { type: 'Binary Location', path: '/usr/bin/fish', description: 'System shell executable path.' }
    ],
    uninstall: {
      normal: { title: 'Revert Shell & Remove', command: 'chsh -s /bin/bash && sudo apt remove -y fish zoxide', description: 'Changes default login shell back to bash and uninstalls packages.' },
      removeConfig: { title: 'Delete Configs', command: 'rm -rf ~/.config/fish ~/.local/share/zoxide', description: 'Deletes user shell customizations and jump history.' },
      completeCleanup: { title: 'Full Shell Restoration', command: 'chsh -s /bin/bash && sudo apt remove --purge -y fish zoxide && rm -rf ~/.config/fish ~/.local/share/zoxide ~/.cache/fish', description: 'Restores bash as default and purges all fish/zoxide files.' }
    },
    communityNotes: [
      { id: '5', author: 'harsha', date: '2026-07-05', content: 'Type `z <keyword>` to jump to any previously visited folder instantly without typing the full path!', upvotes: 29 }
    ],
    popularRank: 5
  },
  {
    slug: 'vscode',
    name: 'Visual Studio Code',
    tagline: 'Microsoft flagship code editor with native Wayland OLED/HiDPI support.',
    category: 'Development',
    whyChoose: [
      'Native Wayland Ozone rendering flags',
      'Unmatched extension marketplace & themes',
      'Direct access to host utilities (fnm, uv, git)',
      'Remote SSH workspace server capability'
    ],
    overview: {
      whatIsIt: 'Visual Studio Code is the industry-standard code editor with built-in Git control, terminal integration, intelligent code completion, and a vast extension ecosystem.',
      whoIsItFor: 'Software engineers and web developers who need a robust graphical editor running crisply under native Wayland.',
      officialWebsite: 'https://code.visualstudio.com',
      version: 'Latest Stable (.deb)',
      lastVerified: 'Ubuntu 24.04 LTS'
    },
    installMethods: [
      {
        id: 'deb-download',
        distro: 'Ubuntu',
        command: `wget -O ~/Downloads/code.deb "https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64"
sudo apt install -y ~/Downloads/code.deb
rm ~/Downloads/code.deb
# Launch with native Wayland flags:
code --enable-features=UseOzonePlatform --ozone-platform=wayland`,
        verificationCommand: `code --version`,
        isRecommended: true,
        isOfficial: true,
        sizeEstimate: '~350 MB',
        whyThisMethod: {
          summary: 'Installing the official .deb package registers Microsoft apt repository automatically for seamless background updates.',
          points: [
            'Official Microsoft .deb release',
            'Registers official apt repo for auto updates',
            'Avoids Snap sandboxing issues with host compilers & shells',
            'Runs with Wayland Ozone flags for pixel-perfect font rendering'
          ]
        },
        sourceUrl: 'https://code.visualstudio.com/Download'
      }
    ],
    problems: [
      {
        id: 'keyring-prompt',
        title: 'Repeated "Unlock Login Keyring" popup every time VS Code launches',
        symptoms: ['Authentication dialog pops up on startup', 'GitHub Copilot / Sync logged out after reboot'],
        cause: 'VS Code uses the GNOME Keyring / libsecret to securely store authentication tokens, which may not unlock automatically on headless/minimal setups.',
        solution: 'Launch VS Code with password store set to basic or install gnome-keyring.',
        commands: [
          '# Launch flag to use file-based token storage:',
          'code --password-store="basic"'
        ],
        verificationCommand: `code --password-store="basic" --status`,
        explanation: 'Using basic password store avoids keyring daemon deadlocks on custom window managers like Niri or Sway.'
      }
    ],
    alternatives: [
      {
        id: 'vscodium',
        name: 'VSCodium',
        tag: 'Open-Source Alternative',
        whyItExists: '100% free and open-source binaries of VS Code without Microsoft telemetry or branding.',
        compatibility: 'Excellent',
        license: 'MIT',
        resourceUsage: 'Moderate',
        pros: ['Zero Microsoft telemetry', 'Identical UI and keyboard shortcuts'],
        cons: ['Uses OpenVSX marketplace (some proprietary extensions like Remote SSH or official C++ are missing)'],
        installCommand: 'sudo apt install codium'
      },
      {
        id: 'neovim',
        name: 'Neovim',
        tag: 'Lightweight Alternative',
        whyItExists: 'Terminal-native Vim text editor with LSP and Lua scripting.',
        compatibility: 'Excellent',
        license: 'Apache-2.0',
        resourceUsage: 'Very Low',
        pros: ['Uses a fraction of RAM', 'No GUI window required', 'Blazing fast startup'],
        cons: ['Steep learning curve for modal editing'],
        installCommand: 'sudo apt install neovim'
      }
    ],
    configFiles: [
      { type: 'Configuration', path: '~/.config/Code/User/settings.json', description: 'User preferences, font sizing, and theme configuration.' },
      { type: 'Configuration', path: '~/.config/Code/User/keybindings.json', description: 'Custom keyboard shortcuts.' },
      { type: 'Data Directory', path: '~/.vscode/extensions/', description: 'Installed extensions and language support packs.' },
      { type: 'Desktop Entry', path: '/usr/share/applications/code.desktop', description: 'System app menu launcher definition.' }
    ],
    uninstall: {
      normal: { title: 'Remove Package', command: 'sudo apt remove -y code', description: 'Uninstalls the VS Code application binary.' },
      removeConfig: { title: 'Delete Settings', command: 'rm -rf ~/.config/Code ~/.vscode', description: 'Deletes all user settings, workspace history, and extensions.' },
      completeCleanup: { title: 'Full Purge', command: 'sudo apt remove --purge -y code && rm -rf ~/.config/Code ~/.vscode ~/.cache/vscode-cpptools', description: 'Removes application, repository keys, and all user data folders.' }
    },
    communityNotes: [
      { id: '6', author: 'harsha', date: '2026-07-05', content: 'For permanent Wayland support without typing flags every time, add `--enable-features=UseOzonePlatform --ozone-platform=wayland` into ~/.config/code-flags.conf!', upvotes: 45 }
    ],
    popularRank: 6
  },
  {
    slug: 'fnm',
    name: 'Fast Node Manager (fnm)',
    tagline: 'Blazing fast Node.js version manager built in Rust.',
    category: 'Development',
    whyChoose: [
      '40x faster startup than legacy bash nvm',
      'Written in Rust for zero overhead',
      'Automatic version switching (--use-on-cd)',
      'Installs Node LTS immediately on setup'
    ],
    overview: {
      whatIsIt: 'fnm (Fast Node Manager) is an ultra-fast Node.js version manager written in Rust. It allows you to switch between Node.js versions instantly based on `.nvmrc` or `.node-version` files in your project directory.',
      whoIsItFor: 'JavaScript/TypeScript developers who need multi-version Node environments without the slow shell startup penalty of legacy nvm.',
      officialWebsite: 'https://github.com/Schniz/fnm',
      version: 'Latest Release',
      lastVerified: 'Ubuntu 24.04 LTS'
    },
    installMethods: [
      {
        id: 'fnm-zip-install',
        distro: 'Ubuntu',
        command: `sudo apt update && sudo apt install -y unzip wget
mkdir -p ~/.local/share/fnm
curl -fsSL https://github.com/Schniz/fnm/releases/latest/download/fnm-linux.zip -o /tmp/fnm.zip
cd /tmp && unzip -o fnm.zip
mv -f fnm ~/.local/share/fnm/
chmod +x ~/.local/share/fnm/fnm
rm /tmp/fnm.zip
mkdir -p ~/.config/fish/conf.d
echo 'set -gx PATH ~/.local/share/fnm $PATH' > ~/.config/fish/conf.d/fnm.fish
echo 'fnm env --use-on-cd --shell fish | source' >> ~/.config/fish/conf.d/fnm.fish
~/.local/share/fnm/fnm install --lts
~/.local/share/fnm/fnm default lts-latest`,
        verificationCommand: `fnm --version && node -v`,
        isRecommended: true,
        isOfficial: true,
        sizeEstimate: '~10 MB (fnm binary) + ~120 MB (Node LTS)',
        whyThisMethod: {
          summary: 'Direct zip installation places standalone Rust binary cleanly into ~/.local/share/fnm and configures automatic directory-switching hooks for Fish shell.',
          points: [
            '40x faster shell startup compared to traditional bash nvm',
            'Automatic directory version switching (--use-on-cd hook)',
            'Installs Node LTS immediately and sets system default',
            'Isolated binary in ~/.local/share/fnm without system pollution'
          ]
        },
        sourceUrl: 'https://github.com/Schniz/fnm'
      }
    ],
    problems: [
      {
        id: 'node-not-found',
        title: 'npm or node commands not found in new terminal windows',
        symptoms: ['Command not found: npm', 'Command not found: node', 'fnm command works but node does not'],
        cause: 'The fnm environment script has not been sourced in your current shell session.',
        solution: 'Verify your shell configuration contains the fnm env evaluation hook.',
        commands: [
          'source ~/.config/fish/conf.d/fnm.fish',
          'fnm current && node -v'
        ],
        verificationCommand: `which node`,
        explanation: 'fnm works by dynamically prepending the active Node version directory to your system PATH variable.'
      }
    ],
    alternatives: [
      {
        id: 'nvm',
        name: 'Node Version Manager (nvm)',
        tag: 'Open-Source Alternative',
        whyItExists: 'The original POSIX shell script for managing Node.js versions.',
        compatibility: 'Good',
        license: 'MIT',
        resourceUsage: 'Moderate',
        pros: ['Universally recognized standard', 'Extensive documentation'],
        cons: ['Significantly slows down terminal shell opening times'],
        installCommand: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash'
      },
      {
        id: 'n',
        name: 'n (Node Version Management)',
        tag: 'Lightweight Alternative',
        whyItExists: 'Simple interactive Node version manager without shell sub-shells.',
        compatibility: 'Good',
        license: 'MIT',
        resourceUsage: 'Low',
        pros: ['No complex shell shims', 'Very simple CLI usage'],
        cons: ['Requires sudo for global /usr/local binary installation'],
        installCommand: 'npm install -g n'
      }
    ],
    configFiles: [
      { type: 'Configuration', path: '~/.config/fish/conf.d/fnm.fish', description: 'Fish shell initialization and auto-switching hook.' },
      { type: 'Data Directory', path: '~/.local/share/fnm/', description: 'fnm executable and all downloaded Node.js version installations.' },
      { type: 'Cache', path: '~/.cache/fnm/', description: 'Temporary download archives for Node versions.' }
    ],
    uninstall: {
      normal: { title: 'Remove Binaries', command: 'rm -rf ~/.local/share/fnm', description: 'Deletes fnm and all installed Node.js versions.' },
      removeConfig: { title: 'Remove Shell Hook', command: 'rm -f ~/.config/fish/conf.d/fnm.fish ~/.bashrc_fnm', description: 'Removes fnm startup configuration from shell dotfiles.' },
      completeCleanup: { title: 'Full Node Cleanup', command: 'rm -rf ~/.local/share/fnm ~/.cache/fnm ~/.config/fish/conf.d/fnm.fish ~/.npm ~/.cache/npm', description: 'Wipes fnm, Node versions, npm cache, and shell configs.' }
    },
    communityNotes: [
      { id: '7', author: 'harsha', date: '2026-07-05', content: 'Using `--use-on-cd` with fish shell makes switching between old Node 18 and Node 22 projects completely seamless!', upvotes: 21 }
    ],
    popularRank: 7
  },
  {
    slug: 'python-ai-env',
    name: 'Python AI Stack (uv, PyTorch, Jupyter)',
    tagline: 'Next-generation Python environment for machine learning and data science.',
    category: 'Development',
    whyChoose: [
      '10-100x faster package installs via Astral uv',
      'Bypasses Ubuntu PEP 668 externally managed errors',
      'CPU-optimized PyTorch wheels save 3GB+ disk space',
      'Instant JupyterLab kernel registration'
    ],
    overview: {
      whatIsIt: 'A cutting-edge Python data science and AI environment powered by Astral uv (blazing fast package installer), isolated virtual environments, CPU-optimized PyTorch, and JupyterLab kernel registration.',
      whoIsItFor: 'AI engineers and data scientists building ML models, data analysis pipelines (Pandas/NumPy/Scikit-learn), or interactive Jupyter notebooks on Ubuntu.',
      officialWebsite: 'https://docs.astral.sh/uv/',
      version: 'Python 3 + uv latest',
      lastVerified: 'Ubuntu 24.04 LTS'
    },
    installMethods: [
      {
        id: 'uv-venv-setup',
        distro: 'Ubuntu',
        command: `sudo apt update && sudo apt install -y python3 python3-pip python3-venv curl wget
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.config/fish/config.fish 2>/dev/null || true
mkdir -p ~/nextgen
python3 -m venv ~/nextgen/
source ~/nextgen/bin/activate || ~/nextgen/bin/python3 -m pip install --upgrade pip
~/nextgen/bin/pip install numpy pandas matplotlib scipy scikit-learn
~/nextgen/bin/pip install --index-url https://download.pytorch.org/whl/cpu torch torchvision torchaudio
~/nextgen/bin/pip install jupyterlab ipykernel ipython
~/nextgen/bin/python3 -m ipykernel install --user --name nextgen --display-name "Python (AI Base)"`,
        verificationCommand: `~/nextgen/bin/python3 -c "import torch, pandas; print('PyTorch:', torch.__version__)"`,
        isRecommended: true,
        isOfficial: true,
        sizeEstimate: '~1.8 GB (includes PyTorch CPU wheels & JupyterLab)',
        whyThisMethod: {
          summary: 'Isolated virtual environment (nextgen) prevents Ubuntu PEP 668 managed errors while installing CPU-optimized PyTorch wheels.',
          points: [
            'Astral uv fast package resolution',
            'Avoids 4GB+ Nvidia CUDA bloat on headless CPU servers',
            'Registers environment as a native Jupyter Kernel',
            'Keeps system /usr/bin/python3 pristine'
          ]
        },
        sourceUrl: 'https://pytorch.org/get-started/locally/'
      }
    ],
    problems: [
      {
        id: 'externally-managed-error',
        title: 'error: externally-managed-environment when running pip install globally',
        symptoms: ['This environment is externally managed', 'pip refuses to install package into /usr/lib/python3'],
        cause: 'Ubuntu 24.04 enforces PEP 668 to prevent pip from overwriting system packages managed by apt.',
        solution: 'Always install Python packages inside a virtual environment (venv) or use uv / pipx.',
        commands: [
          'source ~/nextgen/bin/activate',
          '# Or use uv to install tools globally in isolated shims:',
          'uv tool install <package-name>'
        ],
        verificationCommand: `which pip`,
        explanation: 'Virtual environments keep system Python pristine while allowing complete freedom for AI dependencies.'
      }
    ],
    alternatives: [
      {
        id: 'conda',
        name: 'Miniconda / Anaconda',
        tag: 'Open-Source Alternative',
        whyItExists: 'Cross-platform binary package and environment manager for scientific computing.',
        compatibility: 'Good',
        license: 'BSD-3-Clause',
        resourceUsage: 'High',
        pros: ['Handles non-Python C/C++ library dependencies easily', 'Wide adoption in academia'],
        cons: ['Slow dependency solver compared to uv', 'Large disk footprint'],
        installCommand: 'wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh && bash Miniconda3-latest-Linux-x86_64.sh'
      }
    ],
    configFiles: [
      { type: 'Data Directory', path: '~/nextgen/', description: 'Main virtual environment directory containing Python binaries and installed site-packages.' },
      { type: 'Configuration', path: '~/.local/share/jupyter/kernels/nextgen/', description: 'Jupyter kernel specification JSON file.' },
      { type: 'Binary Location', path: '~/.local/bin/uv', description: 'Astral uv fast package manager binary.' }
    ],
    uninstall: {
      normal: { title: 'Delete Venv', command: 'rm -rf ~/nextgen', description: 'Deletes the AI virtual environment and all installed packages.' },
      removeConfig: { title: 'Remove Jupyter Kernel', command: 'jupyter kernelspec uninstall -y nextgen 2>/dev/null || rm -rf ~/.local/share/jupyter/kernels/nextgen', description: 'Removes kernel registration from JupyterLab.' },
      completeCleanup: { title: 'Full AI Environment Wipe', command: 'rm -rf ~/nextgen ~/.local/share/jupyter/kernels/nextgen ~/.local/bin/uv ~/.cache/uv ~/.cache/pip', description: 'Deletes environment, uv tool, kernel specs, and download caches.' }
    },
    communityNotes: [
      { id: '8', author: 'harsha', date: '2026-07-05', content: 'Using `--index-url https://download.pytorch.org/whl/cpu` saves over 3GB of disk space if you do not have an Nvidia GPU!', upvotes: 38 }
    ],
    popularRank: 8
  },
  {
    slug: 'photoshop',
    name: 'Adobe Photoshop',
    tagline: 'Industry standard photo editing and digital raster graphics design software.',
    category: 'Unsupported / Proprietary',
    isUnsupported: true,
    unsupportedMessage: 'Adobe Photoshop is not natively supported on Linux. Installing via WINE/Proton is unreliable and prone to breaking on updates. We strongly recommend using professional native Linux alternatives.',
    whyChoose: ['Unsupported on Linux — see native open-source alternatives below'],
    overview: {
      whatIsIt: 'Adobe Photoshop is a proprietary photo editing and raster graphics design tool developed by Adobe.',
      whoIsItFor: 'Photographers and digital artists.',
      officialWebsite: 'https://adobe.com/photoshop',
      version: 'Unsupported on Linux',
      lastVerified: 'N/A'
    },
    installMethods: [],
    problems: [
      {
        id: 'wine-crashes',
        title: 'Photoshop Creative Cloud installer fails in WINE / Lutris',
        symptoms: ['Error code 182', 'Blank login screen in Creative Cloud', 'GPU acceleration disabled causing severe lag'],
        cause: 'Adobe uses proprietary DRM and Windows-specific background services that fail under Linux compatibility layers.',
        solution: 'Switch to native Linux tools like GIMP, Krita, or use Photopea directly in your web browser.',
        commands: [
          'sudo apt install -y gimp krita',
          'xdg-open https://www.photopea.com'
        ],
        verificationCommand: `gimp --version`,
        explanation: 'Native Linux alternatives run at full hardware speed without licensing headaches or DRM crashes.'
      }
    ],
    alternatives: [
      {
        id: 'gimp',
        name: 'GIMP (GNU Image Manipulation Program)',
        tag: 'Best Alternative',
        whyItExists: 'The flagship open-source photo and image editor for Linux with advanced retouching tools.',
        compatibility: 'Excellent',
        license: 'GPL-3.0',
        resourceUsage: 'Low',
        pros: ['100% free forever', 'Supports PSD file import/export', 'Extensible via Python/Script-Fu'],
        cons: ['UI layout and keyboard shortcuts differ from Photoshop'],
        installCommand: 'sudo apt install gimp'
      },
      {
        id: 'krita',
        name: 'Krita',
        tag: 'Open-Source Alternative',
        whyItExists: 'Professional digital painting and illustration software built by artists.',
        compatibility: 'Excellent',
        license: 'GPL-3.0',
        resourceUsage: 'Moderate',
        pros: ['Superior brush engine and tablet pressure support', 'Clean modern dark UI', 'Great for concept art'],
        cons: ['Focused more on digital painting than raw photo retouching'],
        installCommand: 'sudo apt install krita'
      },
      {
        id: 'photopea',
        name: 'Photopea',
        tag: 'Lightweight Alternative',
        whyItExists: 'A web-based Photoshop clone that opens instantly in any browser with identical keyboard shortcuts.',
        compatibility: 'Excellent',
        license: 'Freemium / Web',
        resourceUsage: 'Very Low',
        pros: ['Identical interface and shortcuts to Photoshop', 'Zero installation required', 'Handles complex PSDs seamlessly'],
        cons: ['Requires internet connection for initial load'],
        installCommand: 'xdg-open https://www.photopea.com'
      }
    ],
    configFiles: [],
    uninstall: {
      normal: { title: 'Remove WINE Prefix', command: 'rm -rf ~/.wine/drive_c/Program\\ Files/Adobe', description: 'Removes leftover Adobe WINE installations.' },
      removeConfig: { title: 'Clean Cache', command: 'rm -rf ~/.cache/winetricks', description: 'Clears installer cache.' },
      completeCleanup: { title: 'Purge WINE', command: 'rm -rf ~/.wine', description: 'Deletes entire default Windows emulation prefix.' }
    },
    communityNotes: [
      { id: '9', author: 'harsha', date: '2026-07-05', content: 'Photopea is honestly a lifesaver when someone sends you a complex PSD file with text layers!', upvotes: 52 }
    ],
    popularRank: 9
  },
  {
    slug: 'onlyoffice',
    name: 'OnlyOffice Desktop Editors',
    tagline: 'Secure, high-compatibility office suite for text documents, spreadsheets, and presentations.',
    category: 'Productivity',
    whyChoose: [
      'Flawless Microsoft Word (.docx) & Excel (.xlsx) formatting',
      'Clean unified Ribbon tab interface',
      '100% open-source document foundation',
      'Wayland native rendering compatibility'
    ],
    overview: {
      whatIsIt: 'OnlyOffice is a powerful open-source office suite designed for maximum document formatting compatibility with Microsoft Office (.docx, .xlsx, .pptx).',
      whoIsItFor: 'Professionals and students who need to share Word, Excel, and PowerPoint files with colleagues without formatting distortions.',
      officialWebsite: 'https://www.onlyoffice.com',
      version: 'v8.1+',
      lastVerified: 'Ubuntu 24.04 LTS'
    },
    installMethods: [
      {
        id: 'ubuntu-apt-repo',
        distro: 'Ubuntu',
        command: `mkdir -p -m 700 ~/.gnupg
curl -fsSL https://download.onlyoffice.com/GPG-KEY-ONLYOFFICE | sudo gpg --dearmor -o /usr/share/keyrings/onlyoffice.gpg
echo "deb [signed-by=/usr/share/keyrings/onlyoffice.gpg] https://download.onlyoffice.com/repo/debian squeeze main" | sudo tee /etc/apt/sources.list.d/onlyoffice.list
sudo apt update && sudo apt install -y onlyoffice-desktopeditors`,
        verificationCommand: `onlyoffice-desktopeditors --version`,
        isRecommended: true,
        isOfficial: true,
        sizeEstimate: '~480 MB',
        whyThisMethod: {
          summary: 'Registers the official OnlyOffice signed GPG key and apt repository for automatic background updates.',
          points: [
            'Official OnlyOffice signed repository',
            'Automatic updates via apt upgrade',
            'Best native font rendering & system integration',
            'Supports native Wayland protocols'
          ]
        },
        sourceUrl: 'https://helpcenter.onlyoffice.com/installation/desktop-install-ubuntu.aspx'
      },
      {
        id: 'flatpak-install',
        distro: 'Flatpak',
        command: `flatpak install -y flathub org.onlyoffice.desktopeditors`,
        verificationCommand: `flatpak run org.onlyoffice.desktopeditors --version`,
        isRecommended: false,
        isOfficial: true,
        sizeEstimate: '~1.1 GB (with Flatpak runtime)',
        whyThisMethod: {
          summary: 'Sandboxed container installation that runs consistently without modifying system repositories.',
          points: [
            'Isolated container sandbox',
            'Easy permission management via Flatseal'
          ]
        },
        sourceUrl: 'https://flathub.org/apps/org.onlyoffice.desktopeditors'
      }
    ],
    problems: [
      {
        id: 'wayland-x-display',
        title: 'Could not connect to X Display or blank window on start',
        symptoms: ['Error: cannot open display :0', 'Window opens as solid black or white box on Wayland'],
        cause: 'Running in a pure Wayland environment without XWayland or missing display environment variables.',
        solution: 'Install xwayland or launch with Wayland native ozone flags.',
        commands: [
          'sudo apt install -y xwayland',
          'onlyoffice-desktopeditors --enable-features=UseOzonePlatform --ozone-platform=wayland'
        ],
        verificationCommand: `onlyoffice-desktopeditors --version`,
        explanation: 'Enabling Ozone Wayland allows OnlyOffice to render directly without X11 translation layers.'
      }
    ],
    alternatives: [
      {
        id: 'libreoffice',
        name: 'LibreOffice',
        tag: 'Open-Source Alternative',
        whyItExists: 'The default document foundation suite included with most Linux desktop distributions.',
        compatibility: 'Good',
        license: 'MPL-2.0',
        resourceUsage: 'Moderate',
        pros: ['Pre-installed on most distros', 'Extensive OpenDocument (ODF) support'],
        cons: ['Can struggle with complex Microsoft docx formatting'],
        installCommand: 'sudo apt install libreoffice'
      },
      {
        id: 'wps-office',
        name: 'WPS Office',
        tag: 'Commercial Alternative',
        whyItExists: 'Proprietary Chinese office suite known for near-identical Microsoft Office Ribbon interface.',
        compatibility: 'Excellent',
        license: 'Proprietary / Freemium',
        resourceUsage: 'Low',
        pros: ['Familiar MS Office Ribbon layout', 'Fast startup speed'],
        cons: ['Proprietary closed-source software', 'Telemetry and licensing restrictions'],
        installCommand: 'flatpak install -y flathub com.wps.Office'
      }
    ],
    configFiles: [
      { type: 'Configuration', path: '~/.config/onlyoffice/', description: 'User preferences, recent document history, and portal login tokens.' },
      { type: 'Cache', path: '~/.cache/onlyoffice/', description: 'Temporary document recovery and rendered font caches.' },
      { type: 'Binary Location', path: '/usr/bin/onlyoffice-desktopeditors', description: 'Main desktop application binary.' },
      { type: 'Desktop Entry', path: '/usr/share/applications/onlyoffice-desktopeditors.desktop', description: 'Application launcher shortcut.' }
    ],
    uninstall: {
      normal: { title: 'Remove Package', command: 'sudo apt remove -y onlyoffice-desktopeditors', description: 'Uninstalls the application binary.' },
      removeConfig: { title: 'Delete User Data', command: 'rm -rf ~/.config/onlyoffice ~/.cache/onlyoffice ~/.local/share/onlyoffice', description: 'Removes user configuration, cached files, and recovery data.' },
      completeCleanup: { title: 'Full System Purge', command: 'sudo apt remove --purge -y onlyoffice-desktopeditors && sudo rm -f /etc/apt/sources.list.d/onlyoffice.list /usr/share/keyrings/onlyoffice.gpg && rm -rf ~/.config/onlyoffice ~/.cache/onlyoffice', description: 'Deletes app, repository sources, GPG keys, and user settings.' }
    },
    communityNotes: [
      { id: '10', author: 'harsha', date: '2026-07-05', content: 'OnlyOffice handles Microsoft Excel complex formulas and pivot tables much better than LibreOffice Calc!', upvotes: 41 }
    ],
    popularRank: 10
  }
];
