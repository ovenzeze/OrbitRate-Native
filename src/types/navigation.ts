export type RootStackParamList = {
  Home: undefined
  Convert: undefined
  History: undefined
  Favorites: undefined
  Settings: undefined
}

export type NavigationProps<T extends keyof RootStackParamList> = {
  route: {
    params: RootStackParamList[T]
  }
  navigation: {
    navigate: (screen: keyof RootStackParamList, params?: any) => void
    goBack: () => void
  }
}
