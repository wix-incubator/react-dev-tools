const parseErrorStack = require('react-native/Libraries/JavaScriptAppEngine/Initialization/parseErrorStack');
const symbolicateStackTrace = require('react-native/Libraries/JavaScriptAppEngine/Initialization/symbolicateStackTrace');

export async function generate() {
  return await symbolicateStackTrace(await parseErrorStack(new Error()));
}
