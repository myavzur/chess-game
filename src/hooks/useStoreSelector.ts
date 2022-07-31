import { TypedUseSelectorHook, useSelector } from "react-redux";

import { StoreState } from "store";

export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector