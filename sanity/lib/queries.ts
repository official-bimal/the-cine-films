import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    "logoUrl": logo.asset->url,
    tagline,
    phone,
    email,
    address,
    socialInstagram,
    socialFacebook,
    socialYoutube,
    socialTiktok,
    heroStats,
    stats,
    "showreelUrl": showreelUrl,
    "showreelVideoUrl": showreelVideo.asset->url
  }
`;

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc, _createdAt desc){
    _id,
    title,
    category,
    client,
    year,
    "thumbnailUrl": thumbnail.asset->url,
    "videoUrl": video.asset->url,
    externalVideoUrl
  }
`;

export const BRANDS_QUERY = groq`
  *[_type == "brand"] | order(order asc, _createdAt asc){
    _id,
    name,
    "logoUrl": logo.asset->url
  }
`;

export const TEAM_QUERY = groq`
  *[_type == "teamMember"] | order(order asc, _createdAt asc){
    _id,
    name,
    role,
    instagram,
    "photoUrl": photo.asset->url
  }
`;

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(order asc, _createdAt asc){
    _id,
    quote,
    name,
    role,
    company,
    rating,
    "photoUrl": photo.asset->url
  }
`;
