import { type } from '../utils';
import { Action } from '@ngrx/store';

export const AppConfigActionTypes = {
    SET_LANGUAGE: type('[appConfig] SetLanguage'),
    SET_LANGUAGE_FAILURE: type('[appConfig] SetLanguage error'),
    SET_LANGUAGE_SUCCESS: type('[appConfig] SetLanguage success'),
    WINDOW_UNLOAD: type('[appConfig] window onunload'),
    WINDOW_UNLOAD_SUCCESS: type('[appConfig] window onunload success'),
    WINDOW_UNLOAD_FAILURE: type('[appConfig] window onunload error'),
    WINDOW_LOAD: type('[appConfig] window onload'),
    WINDOW_LOAD_SUCCESS: type('[appConfig] window onload success'),
    WINDOW_LOAD_FAILURE: type('[appConfig] window onload error')
};

export class SetLanguage implements Action {
    readonly type: string = AppConfigActionTypes.SET_LANGUAGE;
    constructor(public payload: any) { }
}

export class SetLanguageSuccess implements Action {
    readonly type: string = AppConfigActionTypes.SET_LANGUAGE_SUCCESS;
    constructor(public payload: any) { }
}

export class SetLanguageFailure implements Action {
    readonly type: string = AppConfigActionTypes.SET_LANGUAGE_FAILURE;
    constructor(public payload: any) { }
}

export class OnUnload implements Action {
    readonly type: string = AppConfigActionTypes.WINDOW_UNLOAD;
    constructor(public payload: any) { }
}

export class OnUnloadSuccess implements Action {
    readonly type: string = AppConfigActionTypes.WINDOW_UNLOAD_SUCCESS;
    constructor(public payload: any) { }
}

export class OnUnloadFailure implements Action {
    readonly type: string = AppConfigActionTypes.WINDOW_UNLOAD_FAILURE;
    constructor(public payload: any) { }
}

export class OnLoad implements Action {
    readonly type: string = AppConfigActionTypes.WINDOW_LOAD;
    constructor(public payload: any) { }
}

export class OnLoadSuccess implements Action {
    readonly type: string = AppConfigActionTypes.WINDOW_LOAD_SUCCESS;
    constructor(public payload: any) { }
}

export class OnLoadFailure implements Action {
    readonly type: string = AppConfigActionTypes.WINDOW_LOAD_FAILURE;
    constructor(public payload: any) { }
}

export type appConfig = SetLanguage | SetLanguageSuccess | SetLanguageSuccess | OnUnload | OnUnloadSuccess |
    OnUnloadFailure | OnLoad | OnLoadSuccess | OnLoadFailure;
