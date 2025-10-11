export interface Point {
  lat: number;
  lng: number;
}

export interface Connection {
  start: Point;
  end: Point;
}

export interface WorldMapProps {
  dots?: Connection[];
  lineColor?: string;
  mapColor?: string;
  mapBgColor?: string;
}
