import { createStore } from 'redux';

import tokens from './tokens';

export const store = createStore(tokens)

export interface TokenState {
    accessToken: string,
    refreshToken: string
}

/*
export const store = createStore(() => ({
    accessToken: '',
    refreshToken: ''
} as TokenState));*/