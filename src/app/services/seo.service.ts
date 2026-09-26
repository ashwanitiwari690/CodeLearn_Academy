import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  urlPath?: string;
  type?: 'website' | 'article' | 'course';
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  breadcrumbs?: { name: string; item: string }[];
  schema?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private doc = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly siteName = 'CodeLearn Academy';
  private readonly baseUrl = 'https://codelearn.academy'; // Canonical domain

  updateSeo(config: SeoConfig): void {
    const fullTitle = config.title.includes(this.siteName) 
      ? config.title 
      : `${config.title} | ${this.siteName}`;
    
    this.titleService.setTitle(fullTitle);

    // Meta tags
    this.metaService.updateTag({ name: 'description', content: config.description });
    this.metaService.updateTag({ property: 'og:site_name', content: this.siteName });
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:type', content: config.type || 'website' });
    
    const canonicalUrl = `${this.baseUrl}${config.urlPath || ''}`;
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });

    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });

    if (config.publishedTime) {
      this.metaService.updateTag({ property: 'article:published_time', content: config.publishedTime });
    }
    if (config.modifiedTime) {
      this.metaService.updateTag({ property: 'article:modified_time', content: config.modifiedTime });
    }
    if (config.authorName) {
      this.metaService.updateTag({ property: 'article:author', content: config.authorName });
    }

    // Update canonical link element
    this.updateCanonicalLink(canonicalUrl);

    // Update Schema.org JSON-LD
    this.updateSchema(config, canonicalUrl, fullTitle);
  }

  private updateCanonicalLink(url: string): void {
    if (!this.doc) return;
    let link: HTMLLinkElement | null = this.doc.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private updateSchema(config: SeoConfig, canonicalUrl: string, title: string): void {
    if (!this.doc) return;
    
    // Remove previous dynamic JSON-LD
    const existingScript = this.doc.getElementById('app-dynamic-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const schemas: any[] = [];

    // BreadcrumbList Schema
    if (config.breadcrumbs && config.breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': config.breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': b.name,
          'item': b.item.startsWith('http') ? b.item : `${this.baseUrl}${b.item}`
        }))
      });
    }

    // Custom or specific schema
    if (config.schema) {
      schemas.push(config.schema);
    } else if (config.type === 'article') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': title,
        'description': config.description,
        'url': canonicalUrl,
        'datePublished': config.publishedTime || '2026-01-01',
        'dateModified': config.modifiedTime || '2026-03-01',
        'author': {
          '@type': 'Person',
          'name': config.authorName || 'CodeLearn Editorial Team'
        },
        'publisher': {
          '@type': 'Organization',
          'name': this.siteName,
          'logo': {
            '@type': 'ImageObject',
            'url': `${this.baseUrl}/favicon.ico`
          }
        }
      });
    }

    if (schemas.length > 0) {
      const script = this.doc.createElement('script');
      script.id = 'app-dynamic-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemas.length === 1 ? schemas[0] : { '@context': 'https://schema.org', '@graph': schemas });
      this.doc.head.appendChild(script);
    }
  }
}

