import { useStorage } from '@vueuse/core';
import { computed } from 'vue';

export type Shortcut = {
  name: string;
  href: string;
  description?: string;
  icon?: string;
  visits?: number;
  users: ShortcutUser[];
};

export type ShortcutUser = {
  name: string;
  email: string;
  avatar?: string;
};

const DEFAULT_USER: ShortcutUser = {
  name: 'Júlio L. Müller',
  email: 'julio.muller@rdstation.com',
  avatar: 'https://github.com/juliolmuller.png',
};
const DEFAULT_SHORTCUTS: Shortcut[] = [
  {
    name: 'julio',
    href: 'https://juliolmuller.github.io',
    description: 'Portfólio do Júlio.',
    users: [DEFAULT_USER],
  },
  {
    name: 'google',
    href: 'https://google.com',
    description: 'Site de busca marota.',
    users: [DEFAULT_USER],
  },
  {
    name: 'github',
    href: 'https://github.com/ResultadosDigitais',
    description: 'Repositórios Git.',
    users: [DEFAULT_USER],
  },
  {
    name: 'gitlab',
    href: 'https://repo.tallos.com.br/',
    description: 'Repositórios Git.',
    users: [DEFAULT_USER],
  },
  {
    name: 'oraculo',
    href: 'https://oraculo.rdstation.com.br/',
    description: 'Repositório de documentações da RD.',
    users: [DEFAULT_USER],
  },
  {
    name: 'rdu',
    href: 'https://university.rdstation.com/',
    description: 'Universidade dos RDoers.',
    users: [DEFAULT_USER],
  },
];

const allShortcuts = useStorage('goto@rdstation.com', DEFAULT_SHORTCUTS);

const userShortcuts = computed(() => {
  return allShortcuts.value.filter(({ users }) => {
    return users.some(({ name }) => name === DEFAULT_USER.name);
  });
});

async function saveShortcut(shortcut: Omit<Shortcut, 'users'>) {
  // TODO: bind to user auth
  const actualShortcut: Shortcut = {
    ...shortcut,
    visits: shortcut.visits ?? 0,
    users: [DEFAULT_USER],
  };

  const shortcutIndex = allShortcuts.value.findIndex(({ name }) => {
    return name === actualShortcut.name;
  });

  if (shortcutIndex >= 0) {
    allShortcuts.value[shortcutIndex] = actualShortcut;
    allShortcuts.value = [...allShortcuts.value].sort((a, b) => {
      const visitsInA = a.visits ?? 0;
      const visitsInB = b.visits ?? 0;

      return visitsInA - visitsInB;
    });
  } else {
    allShortcuts.value = [...allShortcuts.value, actualShortcut];
  }
}

async function destroyShortcut(shortcutName: string) {
  allShortcuts.value = allShortcuts.value.filter(
    ({ name }) => name !== shortcutName,
  );
}

export function useShortcuts() {
  return {
    allShortcuts,
    userShortcuts,
    saveShortcut,
    destroyShortcut,
  };
}
