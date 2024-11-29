export interface SysLink {
  type: string;
  linkType: string;
  id: string;
}

export interface Sys {
  space: {
    sys: SysLink;
  };
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
  };
  revision: number;
  contentType?: {
    sys: SysLink;
  };
  locale: string;
}

export interface ContentMetadata {
  tags: never[];
}

export interface ArticleContent {
  nodeType: string;
  data?: {
    target?: {
      metadata?: ContentMetadata;
      sys?: Sys;
      fields?: {
        media?: {
          fields?: {
            description?: string;
            file?: {
              url: string;
              details: {
                size?: number;
                image?: {
                  width: number;
                  height: number;
                };
              };
              fileName?: string;
              contentType?: string;
            };
          };
        };
        altText?: string;
        internal?: string;
        label?: string;
      };
    };
  };
  content?: ArticleContent[];
  value?: string;
  marks?: { type: string }[];
}

export interface RequirementContentValue {
  nodeType: "text";
  value: string;
  marks: never[];
  data: Record<string, unknown>;
}

export interface RequirementHyperlinkContent {
  nodeType: "hyperlink";
  data: {
    uri: string;
  };
  content: RequirementContentValue[];
}

export interface RequirementParagraphContent {
  nodeType: "paragraph";
  data: Record<string, unknown>;
  content: (RequirementContentValue | RequirementHyperlinkContent)[];
}

export interface RequirementBody {
  nodeType: "document";
  data: Record<string, unknown>;
  content: RequirementParagraphContent[];
}

export interface Requirement {
  metadata: ContentMetadata;
  sys: Sys;
  fields: {
    internal: string;
    body: RequirementBody;
  };
}

export interface TabFields {
  header: string;
  body: {
    data: Record<string, unknown>;
    content: ArticleContent[];
    nodeType: string;
  };
}

export interface ArticleSection {
  metadata: ContentMetadata;
  sys: Sys;
  fields?: {
    internal?: string;
    body?: {
      data: Record<string, unknown>;
      content: ArticleContent[];
      nodeType: string;
    };
    requirements?: Requirement[];
    header?: string;
    tabs?: Array<{
      fields: TabFields;
    }>;
  };
}

export interface Slug {
  locale: string;
  slug: string;
  title: string;
}

export interface ParentSlug {
  locale: string;
  slug: string;
  title: string;
}

export interface ArticleSEO {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  index: boolean;
  follow: boolean;
}

export interface ArticleItems {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: ArticleSection[];
  seo: ArticleSEO;
  updated: string;
  relevantArticles: null | unknown[];
  childSlugs: Slug[];
  parentSlugs: ParentSlug[];
}

export interface Article {
  pageProps: {
    type: string;
    locale: string;
    items: ArticleItems;
    mobileMenu: Array<{
      title: string;
      slug: string;
      locale: string;
    }>;
  };
  __N_SSG: boolean;
}