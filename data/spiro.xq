import schema namespace spiro="http://mansoft.nl/spiro" at "data/spiro.xsd";

import module namespace spirograaf="http://mansoft.nl/xquery/spirograaf" at "data/spiro.xqm";

declare variable $fig external;
spirograaf:points-to-svg(spirograaf:points(validate { parse-xml($fig) }))
