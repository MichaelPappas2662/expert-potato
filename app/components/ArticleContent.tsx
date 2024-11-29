"use client";

import React, {
  useCallback,
  useState,
} from 'react';

import {
  CircleCheck,
  House,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Article,
  ArticleContent as IArticleContent,
  ArticleSection,
  ParentSlug,
  RequirementHyperlinkContent,
} from '../../app/types/article';
import styles from '../styles/article.module.scss';
import FeedbackContainer from './FeedbackContainer';
import HelpContainer from './HelpContainer';

interface ArticleContentProps {
  article: Article;
}

const getTabType = (tabHeader: string): "web" | "mobile" => {
  if (tabHeader.toLowerCase().includes("web")) {
    return "web";
  } else if (tabHeader.toLowerCase().includes("mobile")) {
    return "mobile";
  }
  return "web";
};

const isInlineNode = (node: IArticleContent): boolean => {
  const inlineNodeTypes = ["text", "hyperlink", "entry-hyperlink"];
  if (inlineNodeTypes.includes(node.nodeType)) {
    return true;
  }
  if (node.nodeType === "embedded-entry-inline") {
    const entry = node.data?.target;
    const contentTypeId = entry?.sys?.contentType?.sys?.id;
    if (contentTypeId === "button") {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

const renderNode = (node: IArticleContent, key: string): React.ReactNode => {
  switch (node.nodeType) {
    case "text":
      return node.value;
    case "paragraph": {
      const children = node.content || [];
      const inlineNodes: React.ReactNode[] = [];
      const nodes: React.ReactNode[] = [];

      children.forEach((childNode, index) => {
        if (isInlineNode(childNode)) {
          inlineNodes.push(renderNode(childNode, `${key}-${index}`));
        } else {
          if (inlineNodes.length > 0) {
            nodes.push(
              <p key={`${key}-p-${index}`} className={styles.paragraph}>
                {inlineNodes}
              </p>
            );
            inlineNodes.length = 0;
          }

          nodes.push(renderNode(childNode, `${key}-${index}`));
        }
      });

      if (inlineNodes.length > 0) {
        nodes.push(
          <p key={`${key}-p-end`} className={styles.paragraph}>
            {inlineNodes}
          </p>
        );
      }

      return <React.Fragment key={key}>{nodes}</React.Fragment>;
    }
    case "heading-2":
      return (
        <h2 key={key} className={styles.sectionTitle}>
          {node.content?.map((childNode, index) =>
            renderNode(childNode, `${key}-${index}`)
          )}
        </h2>
      );
    case "hyperlink":
      return (
        <a
          key={key}
          href={(node.data as { uri: string }).uri}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.content?.map((childNode, index) =>
            renderNode(childNode, `${key}-${index}`)
          )}
        </a>
      );
    case "entry-hyperlink":
      const entryHyperlinkTarget = node.data?.target;
      const url = entryHyperlinkTarget?.fields?.media?.fields?.file?.url;
      return (
        <a
          key={key}
          href={url}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.content?.map((childNode, index) =>
            renderNode(childNode, `${key}-${index}`)
          )}
        </a>
      );
    case "ordered-list":
      return (
        <ol key={key} className={styles.list}>
          {node.content?.map((listItem, index) =>
            renderNode(listItem, `${key}-${index}`)
          )}
        </ol>
      );
    case "unordered-list":
      return (
        <ul key={key} className={styles.list}>
          {node.content?.map((listItem, index) =>
            renderNode(listItem, `${key}-${index}`)
          )}
        </ul>
      );
    case "list-item":
      return (
        <li key={key}>
          {node.content?.map((childNode, index) =>
            renderNode(childNode, `${key}-${index}`)
          )}
        </li>
      );
    case "embedded-entry-inline": {
      const entry = node.data?.target;
      const contentTypeId = entry?.sys?.contentType?.sys?.id;

      if (contentTypeId === "button" && entry?.fields?.label) {
        return (
          <button key={key} className={styles.doneButton}>
            {entry?.fields.label}
          </button>
        );
      } else if (entry?.fields?.media?.fields?.file?.url) {
        const mediaFields = entry?.fields?.media?.fields;
        const imageUrl = mediaFields?.file?.url.startsWith("//")
          ? "https:" + mediaFields?.file?.url
          : mediaFields?.file?.url;
        const imageWidth = mediaFields?.file?.details?.image?.width;
        const imageHeight = mediaFields?.file?.details?.image?.height;
        const altText =
          entry?.fields?.altText || mediaFields?.description || "Article image";

        return (
          <div key={key} className={styles.imageContainer}>
            <Image
              src={imageUrl ?? ""}
              alt={altText}
              width={imageWidth}
              height={imageHeight}
              className={styles.articleImage}
            />
            {mediaFields?.description && (
              <p className={styles.imageCaption}>{mediaFields?.description}</p>
            )}
          </div>
        );
      }
      return null;
    }
    default:
      return null;
  }
};

const renderContent = (content: IArticleContent[]): React.ReactNode => {
  if (!content) return null;

  try {
    return content.map((node, index) => renderNode(node, `node-${index}`));
  } catch (error) {
    console.error("Error rendering content:", error);
    return null;
  }
};

const renderSection = (
  section: ArticleSection,
  index: number
): React.ReactNode => {
  if (
    section?.sys?.contentType?.sys?.id === "infoPanelRequirement" &&
    section.fields?.requirements
  ) {
    return (
      <div key={section.sys.id} className={styles.requirementsBox}>
        <h2>What you&apos;ll need</h2>
        {section.fields.requirements.map((requirement) => {
          const hyperlink = requirement.fields.body.content[0].content.find(
            (content): content is RequirementHyperlinkContent =>
              content?.nodeType === "hyperlink"
          );

          if (!hyperlink) return null;

          return (
            <div key={requirement.sys.id} className={styles.planRequirement}>
              <CircleCheck size={18} />
              <div>Any</div>
              <a href={hyperlink.data.uri}>{hyperlink.content[0].value}</a>
            </div>
          );
        })}
      </div>
    );
  }

  if (!section.fields?.body?.content) {
    return null;
  }

  if (section.fields.internal?.includes("Take note")) {
    return (
      <section key={`section-${index}`} className={styles.section}>
        <div>{renderContent(section.fields.body.content)}</div>
      </section>
    );
  }

  return (
    <section key={section.sys.id} className={styles.section}>
      {renderContent(section.fields.body.content)}
    </section>
  );
};

export default function ArticleContent({ article }: ArticleContentProps) {
  const [activeTab, setActiveTab] = useState<"web" | "mobile">("web");
  const { items } = article.pageProps;

  const handleTabClick = useCallback(
    (tabHeader: string) => {
      setActiveTab(getTabType(tabHeader));
    },
    [setActiveTab]
  );

  return (
    <article className={styles.articleContainer}>
      <div className={styles.mainContent}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <div className={styles.breadcrumbItem}>
            <House size={16} className={styles.house} />
            <Link href="">SafetyCulture Knowledge Base </Link>
          </div>
          <span className={styles.breadcrumbItem}> / </span>
          {items.parentSlugs.map((parent: ParentSlug) => (
            <div key={parent.slug} className={styles.breadcrumbItem}>
              <Link href={`/${parent.slug}`}>{parent.title}</Link>
              <span className={styles.breadcrumbItem}> / </span>
            </div>
          ))}
          <div className={styles.breadcrumbItem}>
            <a href="test">Actions </a>
            <span className={styles.breadcrumbItem}> / </span>
          </div>
          <div className={styles.lastTittle}>
            <span> {items.title}</span>
          </div>
        </nav>

        <div className={styles.actionsContainer}>
          <button>Actions</button>
          <span>
            Last updated: <b>January 24,2023</b>
          </span>
        </div>

        {/* Article Header */}
        <header className={styles.header}>
          <h1>{items.title}</h1>
          <p>{items.description}</p>
        </header>

        {/* Main Content */}
        {items.content.map((section: ArticleSection, index: number) =>
          renderSection(section, index)
        )}

        {/* Tabs Section */}
        <section className={styles.tabsSection}>
          <div className={styles.tabContent}>
            {items.content
              .filter(
                (section) => section.sys.contentType?.sys.id === "articleTabs"
              )
              .map((section, index) => {
                return (
                  <div
                    key={`tabs-section-${index}`}
                    className={styles.tabsSection}
                  >
                    <h2 className={styles.actionTitle}>
                      {section.fields?.header}
                    </h2>
                    <div
                      role="tablist"
                      aria-label="Content Tabs"
                      className={styles.tabs}
                    >
                      {section.fields?.tabs?.map((tab) => {
                        const tabType = getTabType(tab.fields.header);
                        const isActive = activeTab === tabType;

                        return (
                          <button
                            key={tab.fields.header}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`tab-panel-${tab.fields.header}`}
                            id={`tab-${tab.fields.header}`}
                            className={`${styles.tabButton} ${
                              isActive ? styles.active : ""
                            }`}
                            onClick={() => handleTabClick(tab.fields.header)}
                          >
                            {tab.fields.header}
                          </button>
                        );
                      })}
                    </div>
                    <div
                      role="tabpanel"
                      id={`tab-panel-${activeTab}`}
                      aria-labelledby={`tab-${activeTab}`}
                      className={styles.tabContent}
                    >
                      {section.fields?.tabs?.find(
                        (tab) => getTabType(tab.fields.header) === activeTab
                      )?.fields.body.content && (
                        <div>
                          {renderContent(
                            section.fields?.tabs?.find(
                              (tab) =>
                                getTabType(tab.fields.header) === activeTab
                            )?.fields.body.content || []
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        <HelpContainer />
        <FeedbackContainer/>
      </div>

      {/* Aside section */}
      <aside className={styles.aside}>
        <h2>In this article</h2>
        <nav className={styles.asideNav}>
          <a href="#why-assign-actions">
            Why assign actions to users and groups?
          </a>
          <a href="#what-you'll-need">What you&apos;ll need</a>
          <a href="#take-note">Take note</a>
          <a href="#assign-actions">Assign an action to users and groups</a>
        </nav>
      </aside>
    </article>
  );
}
