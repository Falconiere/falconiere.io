import { Client,  } from "@notionhq/client";

import { NotionAPI } from "notion-client";


import React from "react";

export const notion = new Client({
  auth: process.env.NOTION_AUTH
});

const filter = {
  property: 'Is Published',
  checkbox: {
    equals: true,
  },
};

export const getDatabase = React.cache(async () => {
  
  try {
    if(!process.env.NOTION_DATABASE_ID){
      throw new Error("No database id")
    }
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter
    }) 
    return response;  
  } catch  {
    return { results: []}
  }
  
});

export const getPage = React.cache(async (pageID:string) => {
  const notionApi = new NotionAPI({
    authToken: process.env.NOTION_AUTH_TOKEN,
      
  });
  const recordMap = await notionApi.getPage(pageID);
  return recordMap;
});

export const getPageHeaders = React.cache(async (pageID:string) => {
  try {
    const page = await notion.pages.retrieve({page_id: pageID }) as {
      cover: { external: { url:string }},
      properties: Record<string, any>,
    };
    const block = await notion.blocks.retrieve({block_id: pageID }) as unknown as  { child_page: { title:string }}
    const cover = page?.cover.external?.url
    const properties = page?.properties
    const description = properties?.Description.rich_text[0].plain_text;
    const title = block.child_page.title;
  
    return {
      title,
      description,
      cover
    }  
  } catch (error) {
    return {
      title: "",
      description: "",
      cover: ""
    }
  }
  
})