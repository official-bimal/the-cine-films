import { siteConfig } from "@/lib/data";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import ContactClient from "./ContactClient";

type Settings = {
  phone: string | null;
  email: string | null;
  address: string | null;
  socialInstagram: string | null;
  socialFacebook: string | null;
  socialYoutube: string | null;
  socialTiktok: string | null;
};

export default async function Contact() {
  const settings = await sanityFetch<Settings>(SITE_SETTINGS_QUERY);

  const contact = {
    phone: settings?.phone || siteConfig.phone,
    email: settings?.email || siteConfig.email,
    address: settings?.address || siteConfig.address,
    social: {
      instagram: settings?.socialInstagram || siteConfig.social.instagram,
      facebook: settings?.socialFacebook || siteConfig.social.facebook,
      youtube: settings?.socialYoutube || siteConfig.social.youtube,
      tiktok: settings?.socialTiktok || siteConfig.social.tiktok,
    },
  };

  return <ContactClient contact={contact} />;
}
