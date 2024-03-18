export async function playContent(content, queryParams) {
  setTimeout(() => {
    if (
      content.mimeType === APPConfig.PLAYER_CONFIG.MIME_TYPE.collection ||
      _.get(content, "metaData.mimeType") ===
        APPConfig.PLAYER_CONFIG.MIME_TYPE.collection
    ) {
      if (!content.trackable && content.primaryCategory !== "Course") {
        this.handleNavigation(content, false, queryParams);
      } else {
        const isTrackable =
          content.trackable && content.trackable.enabled === "No"
            ? false
            : true;
        this.handleNavigation(content, isTrackable, queryParams);
      }
    } else if (
      content.mimeType === APPConfig.PLAYER_CONFIG.MIME_TYPE.ecmlContent
    ) {
      this.router.navigate(["/resources/play/content", content.identifier]);
    } else if (
      content.mimeType === APPConfig.PLAYER_CONFIG.MIME_TYPE.questionset
    ) {
      this.router.navigate(["/resources/play/questionset", content.identifier]);
    } else {
      this.router.navigate(["/resources/play/content", content.identifier]);
    }
  }, 0);
}

export async function handleNavigation(content, isTrackable, queryParams) {
  if (!isTrackable) {
    this.router.navigate(
      ["/resources/play/collection", content.courseId || content.identifier],
      { queryParams: { contentType: content.contentType } }
    );
  } else if (content.batchId) {
    this.router.navigate(
      [
        "/learn/course",
        content.courseId || content.identifier,
        "batch",
        content.batchId,
      ],
      { queryParams }
    );
  } else {
    this.router.navigate(["/learn/course", content.identifier], {
      queryParams,
    });
  }
}
