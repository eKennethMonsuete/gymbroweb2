export interface StudentMeasuresResponse {
  name: string;
  email: string;
  password: string;
  lastName: string;
  phone: string;
  personalId: number;
  createdAt: string;
  Measures: {
    Weight: number;
    Hips: number;
    LeftBiceps: number;
    RightBiceps: number;
    LeftQuadriceps: number;
    RightQuadriceps: number;
    LeftCalf: number;
    RightCalf: number;
    createdAt: string;
    PreviousDate: string;
  };
}
