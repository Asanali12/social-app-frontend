import { combineReducers } from 'redux';
import { TokenState } from './store'

export const updateTokens = (tokens: TokenState) => {
    console.log(tokens)
    return {
        type: 'UPDATE',
        tokens,
    }
}

const defaultTokens = {
    accessToken: '',
    reffreshToken: '',
};

const tokenReducers = (state = defaultTokens, action: { type: string, tokens: TokenState}) => {
    switch (action.type) {
        case 'UPDATE':
            return {
                accessToken: action.tokens.accessToken,
                refreshToken: action.tokens.refreshToken
            };
        default:
        return state;
    }
}

const tokens = combineReducers({
    tokenReducers
});
  
export default tokens;