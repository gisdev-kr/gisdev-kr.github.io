# gisdev-kr.github.io

GIS 개발 기록과 프로젝트를 한곳에 모으는 `gisdev-kr` 조직 사이트입니다.

The visual system is an original implementation inspired by the modular landing-page composition of [uBuild Jekyll](https://github.com/forestryio/ubuild-jekyll) and the information-rich blog navigation of [jekyll-theme-satellite](https://github.com/byanko55/jekyll-theme-satellite). Both projects are MIT licensed; this repository does not copy their branding or depend on Forestry CMS.

## Local development

```bash
bundle install
bundle exec jekyll serve --livereload
```

Open <http://127.0.0.1:4000>.

## Optional services

Set values in `_config.yml` only after the corresponding service is configured:

- `google_analytics`: Google Analytics measurement ID
- `goatcounter_code`: GoatCounter site code
- `giscus`: repository/category identifiers after installing the Giscus GitHub App
- `adsense_client`: AdSense publisher ID after approval

All optional integrations fail open: posts, navigation, search, and downloads remain usable when they are disabled or blocked.

## License

MIT. See [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md).
