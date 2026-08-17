const version = document.querySelector("#release-version");
const detailVersion = document.querySelector("#release-detail-version");
const date = document.querySelector("#release-date");
const portableSize = document.querySelector("#portable-size");
const portableDetailSize = document.querySelector("#portable-detail-size");
const installedDetailSize = document.querySelector("#installed-detail-size");
const portableSha = document.querySelector("#portable-sha");
const installedSha = document.querySelector("#installed-sha");

function formatSize(bytes) {
  const megabytes = new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 1,
  }).format(bytes / 1_000_000);
  return `${megabytes} MB`;
}

fetch("./release.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`release metadata: ${response.status}`);
    }
    return response.json();
  })
  .then((release) => {
    const portable = release.artifacts?.portable;
    const installed = release.artifacts?.installed;
    if (!portable || !installed) {
      throw new Error("release metadata does not contain both distributions");
    }

    const versionText = `v${release.version}`;
    const builtAt = new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(release.generated_at));

    version.textContent = versionText;
    detailVersion.textContent = versionText;
    date.textContent = builtAt;
    portableSize.textContent = `포터블 ${formatSize(portable.size_bytes)}`;
    portableDetailSize.textContent = formatSize(portable.size_bytes);
    installedDetailSize.textContent = formatSize(installed.size_bytes);
    portableSha.textContent = portable.sha256;
    installedSha.textContent = installed.sha256;
  })
  .catch(() => {
    date.textContent = "배포 정보를 불러오지 못했습니다.";
  });
