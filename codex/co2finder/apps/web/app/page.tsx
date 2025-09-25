'use client';

import { FormEvent, useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams({ q: query });
    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <section className="flex w-full max-w-3xl flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-5xl font-semibold tracking-tight text-emerald-600 sm:text-6xl">
            CO₂ Finder
          </div>
          <p className="max-w-xl text-sm text-slate-600 sm:text-base">
            企業の脱炭素への取り組みや排出量データを横断検索し、最適なリサーチの起点を見つけるためのツールです。
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full rounded-full border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center gap-3 px-5 py-3">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5 flex-none text-slate-400"
            >
              <path
                d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              autoComplete="off"
              autoFocus
              className="h-10 w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
              name="q"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="企業名やキーワードで検索"
              value={query}
            />
            {query && (
              <button
                type="button"
                className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                onClick={() => setQuery('')}
                aria-label="入力をクリア"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex justify-center gap-3 border-t border-slate-100 px-5 py-3 text-sm text-slate-600">
            <button
              type="submit"
              className="rounded-md border border-transparent bg-slate-100 px-5 py-2 font-medium transition hover:border-slate-200 hover:bg-slate-200"
            >
              CO₂ Finder 検索
            </button>
            <a
              href="https://www.env.go.jp/earth/ondanka/supply_chain/gvc.html"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-transparent px-5 py-2 font-medium text-emerald-600 transition hover:border-emerald-100 hover:bg-emerald-50"
            >
              学習リソース
            </a>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500 sm:text-sm">
          {['サステナビリティ', 'TCFD', 'Science Based Targets', 'ESG レポート', 'Scope 3'].map((keyword) => (
            <button
              key={keyword}
              type="button"
              onClick={() => setQuery(keyword)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
            >
              {keyword}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
