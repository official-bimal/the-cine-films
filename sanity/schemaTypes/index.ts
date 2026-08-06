import { type SchemaTypeDefinition } from "sanity";

import siteSettings from "./siteSettings";
import project from "./project";
import brand from "./brand";
import teamMember from "./teamMember";
import testimonial from "./testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, project, brand, teamMember, testimonial],
};
