# atlaAS_node

an FSRouting for node, ported the logic from [atlaAS](https://github.com/hakimjazuli/atlaAS)

## ports

-   due to how easy for php to immediate echo using it's `html mode` using `?>`, HTML_ELEMENTS
    ,`<?php`, there are some design pattern that cannot be used dirrectly:
    > -   this node version requires the `method` to return `string`, which then interpretted as
    >     `http.ServerResponse` `string`
