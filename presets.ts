import { buildSchema, introspectionFromSchema } from "graphql";

const githubIntrospection = require('./presets/github_introspection.json');
const yelpIntrospection = require('./presets/yelp_introspection.json');
const shopifyIntrospection = require('./presets/shopify_introspection.json');

//gfk master schema 
const gfkMasterSDLText = 'scalar Timestamp  enum Periodicity {   Monthly   Weekly }  enum Kpi {   salesUnits   revenue   averagePrice   numericDistribution   weightedNumericDistribution   priceElasticity   tprPercentage   tprPercentageAggregate   tprEfficiency   tprEfficiencyAggregate   relativeTprEfficiency   relativeTprEfficiencyAggregate   salesUnitsUplift   salesUnitsUpliftAggregate   weightedCoverage   weightedCoverageAggregate   priceReduction   priceReductionAggregate }  enum FactType {   BASIC   MONEY   PERCENTAGE }  enum RelativePeriod {   Current   YearToDate   MovingAnnualTotal   PreviousPeriod }  type BrandDetails {   averagePrice: Fact   revenue: Fact   salesUnits: Fact }  enum FeatureType {   Calculated   Discrete   MultiAttribute   Numerical   Text }  enum EvidenceType {   PRICE_AND_SALESUNITS_HISTORY   PRICE_CANABALISM_HISTORY   TPR_EFFICIENCY   NOT_YET_SUPPORTED }  type Recommendation {   product: Product!   comparators: [Product!]!   opportunityId: Int!   evidences: [EvidenceType!]!   levelOfConfidence: Float!   id: String! } type Brand {   name: String!   description: String   details: BrandDetails }  type Country {   id: String!   name: String!   currency: String! }  type Growth {   period: Period   available: Boolean   info: String   percentageValue: Float   actualValue: Float }  type Fact {   type: FactType!   value: Float   growth: Growth   history(maxPeriods: Int = 52): [Fact!]   available: Boolean   info: String   period: Period }  type Period {   endDate: Timestamp!   startDate: Timestamp!   id: Int!   name: String!   periodicity: String! }  type ComparisonPeriods {   earliest: ComparisonPeriod!   latest: ComparisonPeriod! }  type ComparisonPeriod {   start: Period!   end:  Period! }  type MarketSummary {   averagePrice: Fact   revenue: Fact   salesUnits: Fact }  type OutletGroupSummary {   averagePrice: Fact   revenue: Fact   salesUnits: Fact }  type FilteredMarketSummary {   averagePrice: Fact   revenue: Fact   salesUnits: Fact   totalBrands: Int }  type Competitor {   product: Product   eDistance: Float!   comparisonFeatures: [String!] }  type OutletGroupAnalysis {   outletGroup: OutletGroup!   averagePrice: Fact   revenue: Fact   salesUnits: Fact   weightedNumericDistribution: Fact   numericDistribution: Fact }  type ProductDetails {   averagePrice: Fact   revenue: Fact   salesUnits: Fact   weightedNumericDistribution: Fact   numericDistribution: Fact   features: [Feature!]   priceElasticity: Fact   tprPercentage: Fact   tprPercentageAggregate: Fact   tprEfficiency: Fact   tprEfficiencyAggregate: Fact   relativeTprEfficiency: Fact   relativeTprEfficiencyAggregate: Fact   salesUnitsUplift: Fact   salesUnitsUpliftAggregate: Fact   weightedCoverage: Fact   weightedCoverageAggregate: Fact   priceReduction: Fact   priceReductionAggregate: Fact   tprCoefficients: [TprCoefficient!]    competitors: [Competitor!]   outletGroupAnalyses(sortedBy: String): [OutletGroupAnalysis!]    simulatedTprScenario(outletGroupId: Int!, discount: Float!, tprCoefficient: Float): OutletGroupAnalysis  }  type BrandShareSummary {   revenue: BrandShareFact   salesUnits: BrandShareFact }  type Product {   brand: Brand!   id: String!   name: String!   details: ProductDetails }  type FeatureValue {   value: String!   id: String! }  type Feature {   name: String!   id: String!   values: [FeatureValue!]   type: FeatureType }  type ItemGroup {   name: String!   id: String!   keyFeatures: [Feature!] }  type BrandHitlistItem {   brand: Brand!   available: Boolean!   value: Float   sharePercentage: Float   info: String   rank: Int }  type BrandShareFact {   type: FactType!   marketSize: Float!   shares: [BrandHitlistItem]!   growth: Growth   period: Period   history: [BrandShareFact!] }  type SortedProducts {   offset: Int!   products: [Product!]   total: Int!   filteredTotal: Int! }  type BrandsSummary {   brands: [Brand!]   filteredTotal: Int!   total: Int! }  type TprCoefficient {   value: Float   available: Boolean!   info: String   outletGroup: OutletGroup! }  type OutletGroup {   id: Int!   name: String! }  input CellInput {   countryId: String!   itemGroupId: String! }  input ContextInput {   cell: CellInput!   periodId: Int! }  input ProductFilterInput {   brandNames: [String!]   priceMin: Float   priceMax: Float   features: [ProductFilterFeatureInput]   itemIds: [String] }  input ProductFilterFeatureInput {   key: String   type: FeatureType   values: [Float!] }  input PeriodRangeInput {   from: Int!   to: Int! }  input ProductInput {   id: String!   value: [Float] }  input RecommendationInput {   product: ProductInput!   comparators: [ProductInput!]!   opportunityId: Int!   evidences: [EvidenceType!]!   levelOfConfidence: Float!   id: String! }  input EvidenceInput {   kpi: Kpi!   values: [ProductInput] }  type ResponseMessage {   message: String! }  type Query {   outletGroups(     context: ContextInput!     periodicity: Periodicity!   ): [OutletGroup!]     referenceOutletGroups(     name: String   ): [OutletGroup!]    referenceOutletGroup(     id: Int!   ): OutletGroup    countries(itemGroupId: String!): [Country!]     latestPeriod(cell: CellInput!, periodicity: Periodicity): Period!    periodInfo(periodicity: Periodicity!, periodId: Int!): Period!    comparisonPeriods(     periodId: Int!,     periodicity: Periodicity!,     relativePeriod: RelativePeriod!   ): ComparisonPeriods!    itemGroups: [ItemGroup!]     itemGroup(itemGroupId: String!, countryId: String!): ItemGroup!    product(     productId: String!     context: ContextInput!     periodicity: Periodicity     relativePeriod: RelativePeriod     periodRange: PeriodRangeInput   ): Product!    products(     context: ContextInput!     periodicity: Periodicity!     relativePeriod: RelativePeriod!     outletGroup: Int     filter: ProductFilterInput     limit: Int     offset: Int     sortedBy: String   ): SortedProducts!    marketSummary(     context: ContextInput!     periodicity: Periodicity!     relativePeriod: RelativePeriod!   ): MarketSummary!    outletGroupSummary(     context: ContextInput!     periodicity: Periodicity!     relativePeriod: RelativePeriod!     outletGroup: Int   ): OutletGroupSummary!    brandsSummary(     context: ContextInput!     periodicity: Periodicity!     relativePeriod: RelativePeriod!     outletGroup: Int     filter: ProductFilterInput   ): BrandsSummary!    brandShareSummary(     context: ContextInput!     periodicity: Periodicity!     relativePeriod: RelativePeriod   ): BrandShareSummary!    brands(name: String): [Brand!]    filteredMarketSummary(     context: ContextInput!     periodicity: Periodicity!     relativePeriod: RelativePeriod!     outletGroup: Int     filter: ProductFilterInput   ): FilteredMarketSummary!    recommendations(     context: ContextInput!   ): [Recommendation!] }  type Mutation {   storeRecommendations(     context: ContextInput!     recommendations: [RecommendationInput!]!   ): ResponseMessage   storeRecommendationEvidence(     id: String!     evidence: [EvidenceInput!]!   ): ResponseMessage }  schema {   query: Query   mutation: Mutation } ';
var data = introspectionFromSchema(buildSchema(gfkMasterSDLText));
const gfkMasterIntrospection = {data}; 


//gfk current schema brand only 
const gfkBrandCurrentSDLText = 
`scalar Timestamp

type BrandDetails {
  averagePrice: Fact
  revenue: Fact
  salesUnits: Fact
}

type Brand {
  name: String!
  description: String
  details: BrandDetails
}

type BrandShareSummary {
  revenue: BrandShareFact
  salesUnits: BrandShareFact
}

type BrandHitlistItem {
  brand: Brand!
  available: Boolean!
  value: Float
  sharePercentage: Float
  info: String
  rank: Int
}

type BrandShareFact {
  type: FactType!
  marketSize: Float!
  shares: [BrandHitlistItem]!
  growth: Growth
  period: Period
  history: [BrandShareFact!]
}


type BrandsSummary {
  brands: [Brand!]
  filteredTotal: Int!
  total: Int!
}

enum Periodicity {
  Monthly
  Weekly
}

enum Kpi {
  salesUnits
  revenue
  averagePrice
  numericDistribution
  weightedNumericDistribution
  priceElasticity
  tprPercentage
  tprPercentageAggregate
  tprEfficiency
  tprEfficiencyAggregate
  relativeTprEfficiency
  relativeTprEfficiencyAggregate
  salesUnitsUplift
  salesUnitsUpliftAggregate
  weightedCoverage
  weightedCoverageAggregate
  priceReduction
  priceReductionAggregate
}

enum FactType {
  BASIC
  MONEY
  PERCENTAGE
}

enum RelativePeriod {
  Current
  YearToDate
  MovingAnnualTotal
  PreviousPeriod
}

enum FeatureType {
  Calculated
  Discrete
  MultiAttribute
  Numerical
  Text
}

type Growth {
  period: Period
  available: Boolean
  info: String
  percentageValue: Float
  actualValue: Float
}

type Fact {
  type: FactType!
  value: Float
  growth: Growth
  history(maxPeriods: Int = 52): [Fact!]
  available: Boolean
  info: String
  period: Period
}

type Period {
  endDate: Timestamp!
  startDate: Timestamp!
  id: Int!
  name: String!
  periodicity: String!
}

type ComparisonPeriods {
  earliest: ComparisonPeriod!
  latest: ComparisonPeriod!
}

type ComparisonPeriod {
  start: Period!
  end:  Period!
}

type Query {
  brandsSummary(
    periodicity: Periodicity!
    relativePeriod: RelativePeriod!
    outletGroup: Int
  ): BrandsSummary! 
  brandShareSummary(
    periodicity: Periodicity!
    relativePeriod: RelativePeriod
  ): BrandShareSummary! 
  brands(name: String): [Brand!] 
}

schema {
  query: Query
}
`;

data = introspectionFromSchema(buildSchema(gfkBrandCurrentSDLText));
const gfkBrandCurrentIntrospection = {data}; 



export const PRESETS = {
  'GfK Schema': gfkMasterIntrospection,
  'GfK Brand Current': gfkBrandCurrentIntrospection,
  'reference:Shopify': shopifyIntrospection,
  'reference:GitHub': githubIntrospection
};

export const defaultPresetName = 'GfK Schema';
export const defaultPreset = PRESETS[defaultPresetName];
