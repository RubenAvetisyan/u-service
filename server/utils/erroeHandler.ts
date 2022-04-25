import type { NotionClientError } from '@notionhq/client'
import { APIErrorCode, ClientErrorCode, UnknownHTTPResponseError, isNotionClientError } from '@notionhq/client'

function errorHandler(error: NotionClientError) {
  // error is now strongly typed to NotionClientError
  switch (error.code) {
    case ClientErrorCode.RequestTimeout:
      // ...
      break
    case APIErrorCode.ObjectNotFound:
      // ...
      break
    case APIErrorCode.Unauthorized:
      // ...
      break
    // ...
    default:
      // you could even take advantage of exhaustiveness checking
      UnknownHTTPResponseError.isUnknownHTTPResponseError(error)
  }
}

export default function(error) {
  if (isNotionClientError(error))
    errorHandler(error)
}
