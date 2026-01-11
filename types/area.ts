export interface Area {
  id: string;
  name: string;
  description?: string;
  icon?: string; // emoji
  thoughtCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AreaCreateInput {
  name: string;
  description?: string;
  icon?: string;
}

export interface AreaUpdateInput {
  name?: string;
  description?: string;
  icon?: string;
}
