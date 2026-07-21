export type Shape = 'square' | 'rectangle' | 'circle' | 'triangle' | 'trapezoid' | 'parallelogram';

export interface AreaResult {
  shape: Shape;
  area: number;
  perimeter?: number;
}

export function calculateArea(
  shape: Shape,
  params: number[]
): AreaResult {
  let area: number;
  let perimeter: number | undefined;

  switch (shape) {
    case 'square':
      area = params[0] * params[0];
      perimeter = params[0] * 4;
      break;
    case 'rectangle':
      area = params[0] * params[1];
      perimeter = 2 * (params[0] + params[1]);
      break;
    case 'circle':
      area = Math.PI * params[0] * params[0];
      perimeter = 2 * Math.PI * params[0];
      break;
    case 'triangle':
      area = 0.5 * params[0] * params[1];
      perimeter = params[0] + params[1] + Math.sqrt(params[0] * params[0] + params[1] * params[1]);
      break;
    case 'trapezoid':
      area = 0.5 * (params[0] + params[1]) * params[2];
      perimeter = params[0] + params[1] + 2 * Math.sqrt(Math.pow((params[1] - params[0]) / 2, 2) + params[2] * params[2]);
      break;
    case 'parallelogram':
      area = params[0] * params[1];
      perimeter = 2 * (params[0] + params[1]);
      break;
  }

  return {
    shape,
    area: Math.round(area * 100) / 100,
    perimeter: perimeter ? Math.round(perimeter * 100) / 100 : undefined,
  };
}

export function getShapeParams(shape: Shape): string[] {
  switch (shape) {
    case 'square':
      return ['side'];
    case 'rectangle':
      return ['width', 'height'];
    case 'circle':
      return ['radius'];
    case 'triangle':
      return ['base', 'height'];
    case 'trapezoid':
      return ['base1', 'base2', 'height'];
    case 'parallelogram':
      return ['base', 'height'];
  }
}
