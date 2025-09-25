import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
import { MAX_SEARCH_RESULTS, SearchResult, selectTopResults } from '@co2finder/core';

config();

const app = express();
app.use(cors());

const PORT = Number(process.env.API_PORT ?? process.env.PORT ?? 3001);

const candidates: SearchResult[] = [
  {
    name: 'トヨタ自動車',
    description: 'カーボンニュートラルビジョンと水素戦略に関する公式発表資料。',
    url: 'https://global.toyota/jp/newsroom/corporate/35312457.html',
    source: 'Toyota Global Newsroom'
  },
  {
    name: 'ソニーグループ',
    description: 'Road to Zero 計画および環境データブック。',
    url: 'https://www.sony.com/ja/SonyInfo/csr/environment/plan/',
    source: 'Sony CSR Report'
  },
  {
    name: 'パナソニックホールディングス',
    description: 'Panasonic GREEN IMPACT と CO₂ 排出削減目標。',
    url: 'https://holdings.panasonic/jp/corporate/sustainability/co2.html',
    source: 'Panasonic Sustainability'
  },
  {
    name: 'リコー',
    description: '環境経営ビジョンと再エネ 100% 宣言 RE100 の取り組み。',
    url: 'https://jp.ricoh.com/sustainability/environment',
    source: 'Ricoh Sustainability'
  },
  {
    name: '日立製作所',
    description: '環境ビジョンと GX に向けた 2030/2050 年ロードマップ。',
    url: 'https://www.hitachi.co.jp/environment/index.html',
    source: 'Hitachi Environment'
  },
  {
    name: '富士通',
    description: 'Fujitsu Climate Transition Plan と脱炭素の目標。',
    url: 'https://www.fujitsu.com/jp/about/environment/climate/',
    source: 'Fujitsu Sustainability'
  }
];

app.get('/api/search', (req, res) => {
  const query = String(req.query.q ?? '').trim();
  const limitParam = Number.parseInt(String(req.query.limit ?? ''), 10);
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, MAX_SEARCH_RESULTS) : MAX_SEARCH_RESULTS;

  if (!query) {
    res.json({ results: selectTopResults(candidates, limit) });
    return;
  }

  const normalizedQuery = query.toLowerCase();
  const filtered = candidates.filter((candidate) => {
    return (
      candidate.name.toLowerCase().includes(normalizedQuery) ||
      candidate.description.toLowerCase().includes(normalizedQuery) ||
      candidate.source.toLowerCase().includes(normalizedQuery)
    );
  });

  res.json({ results: selectTopResults(filtered, limit) });
});

app.listen(PORT, () => {
  console.log(`CO2 Finder API listening on http://localhost:${PORT}`);
});
