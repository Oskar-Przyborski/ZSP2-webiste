import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import Navigation from "./Navigation";
import Article from "./Article";
import Page from "./Page";

import Body from "./Objects/Body";
import NavigationCategory from "./Objects/NavigationCategory";
import TiktokEmbed from "./Objects/TiktokEmbed";
import Grid from "./Objects/Grid";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    Navigation,
    Article,
    TiktokEmbed,
    Page,
    Body,
    NavigationCategory,
    Grid,
  ]),
});
