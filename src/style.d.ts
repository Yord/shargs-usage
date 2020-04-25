export interface Style {
  [key: string]: {
    padEnd?:   number
    padStart?: number
    width:     number
  }[]
}

export const defaultStyle: Style