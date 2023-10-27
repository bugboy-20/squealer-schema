import { z } from 'zod';

// GeoJSON schema built following the official standard:
// https://datatracker.ietf.org/doc/html/rfc7946

const positionSchema = z
  .tuple([z.number(), z.number()])
  .or(
    z.tuple([z.number(), z.number(), z.number()]),
  ) satisfies z.ZodType<GeoJSON.Position>;

export type position_t = z.infer<typeof positionSchema>;

export const pointSchema = z.object({
  type: z.literal('Point'),
  coordinates: positionSchema,
}) satisfies z.ZodType<GeoJSON.Point>;

export const multiPointSchema = z.object({
  type: z.literal('MultiPoint'),
  coordinates: z.array(positionSchema),
}) satisfies z.ZodType<GeoJSON.MultiPoint>;

export const lineStringSchema = z.object({
  type: z.literal('LineString'),
  coordinates: z.array(positionSchema),
}) satisfies z.ZodType<GeoJSON.LineString>;

export const multiLineStringSchema = z.object({
  type: z.literal('MultiLineString'),
  coordinates: z.array(z.array(positionSchema)),
}) satisfies z.ZodType<GeoJSON.MultiLineString>;

export const polygonSchema = z.object({
  type: z.literal('Polygon'),
  coordinates: z.array(z.array(positionSchema)),
}) satisfies z.ZodType<GeoJSON.Polygon>;

export const multiPolygonSchema = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.array(z.array(z.array(positionSchema))),
}) satisfies z.ZodType<GeoJSON.MultiPolygon>;

export const geometrySchema = z.union([
  pointSchema,
  multiPointSchema,
  lineStringSchema,
  multiLineStringSchema,
  polygonSchema,
  multiPolygonSchema,
]) satisfies z.ZodType<GeoJSON.Geometry>;

export const featureSchema = z.object({
  type: z.literal('Feature'),
  geometry: geometrySchema,
  id: z.union([z.string(), z.number(), z.undefined()]).optional(),
  properties: z
    .record(z.any())
    .and(z.object({ popup: z.string() }))
    .nullable(),
}) satisfies z.ZodType<GeoJSON.Feature>;

// export const featureCollectionSchema = geoJsonObjectSchema.extend({
//   type: z.literal('FeatureCollection'),
//   features: z.array(featureSchema),
// }) satisfies z.ZodType<GeoJSON.FeatureCollection>;

export const featureCollectionSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(featureSchema),
  center: positionSchema,
  zoom: z.number().optional(),
}) satisfies z.ZodType<GeoJSON.FeatureCollection>;

export type featureCollection_t = z.infer<typeof featureCollectionSchema>;
