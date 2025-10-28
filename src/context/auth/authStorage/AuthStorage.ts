import { MMKV } from 'react-native-mmkv';

import { env } from '@/env';

import { Storage } from './AuthStorage.types';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const EXPIRES_KEY = 'expires';

class AuthStorage {
  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;
  private _expires: number | null = null;
  private _storage: Storage | null = null;

  constructor(_storage: Storage) {
    try {
      this._storage = _storage;
      this.accessToken = _storage.getItem(ACCESS_TOKEN_KEY);
      this.refreshToken = _storage.getItem(REFRESH_TOKEN_KEY);
      this.expires = Number(_storage.getItem(EXPIRES_KEY));
    } catch {
      this._storage = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.expires = null;
    }
  }

  get accessToken(): string | null {
    return this._accessToken;
  }

  set accessToken(value: string | null) {
    this._accessToken = value;

    try {
      if (typeof value === 'string') {
        this._storage?.setItem(ACCESS_TOKEN_KEY, value);
      } else {
        this._storage?.removeItem(ACCESS_TOKEN_KEY);
      }
    } catch (error) {
      this._storage?.onError(error);
    }
  }

  get refreshToken(): string | null {
    return this._refreshToken;
  }

  set refreshToken(value: string | null) {
    this._refreshToken = value;

    try {
      if (typeof value === 'string') {
        this._storage?.setItem(REFRESH_TOKEN_KEY, value);
      } else {
        this._storage?.removeItem(REFRESH_TOKEN_KEY);
      }
    } catch (error) {
      this._storage?.onError(error);
    }
  }

  get expires(): number | null {
    return this._expires;
  }

  set expires(value: number | null) {
    this._expires = value;

    try {
      if (typeof value === 'number') {
        this._storage?.setItem(EXPIRES_KEY, value.toString());
      } else {
        this._storage?.removeItem(EXPIRES_KEY);
      }
    } catch (error) {
      this._storage?.onError(error);
    }
  }

  clearAll(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.expires = null;
  }
}

const mmkvStorage = new MMKV({
  id: 'auth-storage',
  encryptionKey: env.EXPO_PUBLIC_AUTH_STORAGE_ENCRYPTION_KEY,
});

const storage: Storage = {
  getItem: (key: string) => mmkvStorage.getString(key) ?? null,
  setItem: (key: string, value: string) => mmkvStorage.set(key, value),
  removeItem: (key: string) => mmkvStorage.delete(key),

  onError: (error: unknown) => {
    // TODO: Handle errors (e.g. log them)
    // eslint-disable-next-line no-console
    console.error('AuthStorage error:', error);
  },
};

export const authStorage = new AuthStorage(storage);
