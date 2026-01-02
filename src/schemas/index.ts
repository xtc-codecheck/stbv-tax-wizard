/**
 * Barrel Export für alle Schemas
 * @module schemas
 */

// Position Schemas
export {
  tenthRateSchema,
  billingTypeSchema,
  feeTableSchema,
  positionBaseSchema,
  positionSchema,
  positionsArraySchema,
  validatePositionByBillingType,
  type TenthRate,
  type BillingType,
  type FeeTable,
  type PositionBase,
  type PositionSchema,
} from './position.schema';

// Client Data Schemas
export {
  emailSchema,
  postalCodeSchema,
  clientDataSchema,
  clientDataStrictSchema,
  emptyClientData,
  type ClientDataSchema,
  type ClientDataStrictSchema,
} from './clientData.schema';

// Discount Schemas
export {
  discountTypeSchema,
  discountSchema,
  discountOptionalSchema,
  type DiscountType,
  type DiscountSchema,
} from './discount.schema';

// Template Schemas
export {
  templateSchema,
  createTemplateSchema,
  templatesArraySchema,
  type TemplateSchema,
  type CreateTemplateSchema,
} from './template.schema';

// Branding Schemas
export {
  ibanSchema,
  bicSchema,
  brandingSettingsSchema,
  emptyBrandingSettings,
  type BrandingSettingsSchema,
} from './branding.schema';
