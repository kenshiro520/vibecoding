export interface SearchResult {
  /** 企業名またはブランド名 */
  name: string;
  /** 検索結果の補足説明 */
  description: string;
  /** 情報の参照元 URL */
  url: string;
  /** データの出典や分類名 */
  source: string;
}

export interface SearchQuery {
  /** ユーザーが入力したキーワード */
  term: string;
  /** 返却する最大件数 */
  limit?: number;
}

export interface SearchResponse {
  /** 実際に返却された候補一覧 */
  results: SearchResult[];
}

/**
 * 配列から重複を取り除き、指定件数に丸め込むユーティリティ。
 * 本番実装ではスコアリングや統合処理を差し替える想定。
 */
export function selectTopResults(results: SearchResult[], limit = 5): SearchResult[] {
  const seen = new Set<string>();
  const unique = results.filter((item) => {
    const key = `${item.name}-${item.url}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  return unique.slice(0, Math.max(0, limit));
}

export const MAX_SEARCH_RESULTS = 5;
