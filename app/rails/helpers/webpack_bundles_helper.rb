module WebpackBundlesHelper
  include ActionView::Helpers::AssetTagHelper

  def webpack_common_js_bundles
    bundles = [
      manifest["webpack-runtime"]["js"],
      manifest["vendor"]["js"]
    ].flatten

    javascript_include_tag(*bundles)
  end

  def webpack_app_js_bundle(app)
    javascript_include_tag(manifest[app]["js"])
  end

  def webpack_css_bundle(app)
    stylesheet_link_tag(manifest[app]["css"]) unless Rails.env.development?
  end

  private

  def manifest
    @manifest ||= JSON.parse(File.read(Rails.root.join("public", "webpack-manifest.json")))
  end
end
