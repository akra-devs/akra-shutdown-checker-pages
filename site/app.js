const version = document.querySelector("#release-version");
const detailVersion = document.querySelector("#release-detail-version");
const date = document.querySelector("#release-date");
const size = document.querySelector("#release-size");
const sha = document.querySelector("#release-sha");
const download = document.querySelector("#download-button");
const checksum = document.querySelector("#checksum-link");

fetch("./release.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`release metadata: ${response.status}`);
    }
    return response.json();
  })
  .then((release) => {
    const versionText = `v${release.version}`;
    const megabytes = new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 1,
    }).format(release.size_bytes / 1_000_000);
    const builtAt = new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(release.generated_at));

    version.textContent = versionText;
    detailVersion.textContent = versionText;
    date.textContent = builtAt;
    size.textContent = `${megabytes} MB`;
    sha.textContent = release.sha256;
    download.href = `./${encodeURIComponent(release.file_name)}`;
    checksum.href = `./${encodeURIComponent(release.file_name)}.sha256`;
  })
  .catch(() => {
    date.textContent = "페이지 배포 정보 확인 필요";
  });
