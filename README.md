# akra-shutdown-checker-pages

Public Windows download deployment for
[AKRA WhyShutdown?](https://akra.kr/akra-shutdown-checker-pages/).

The Rust source stays in the private `akra-shutdown-checker` repository. Its
workflow tests and builds the Windows x64 binaries before uploading a
short-lived distribution artifact. A successful private build dispatches this
public repository once with the exact run ID, attempt, and source SHA. The
public workflow verifies that completed run, the portable and installed
archives, and their SHA-256 checksums, then publishes both ZIPs as GitHub
Release assets and updates the download page. It does not poll on a schedule.

- `main`: download page source, deployment workflow, and documentation
- `gh-pages`: generated public website and latest verified Windows package
- GitHub Releases: public, versioned Windows downloads
