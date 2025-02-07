/**
 * Applies a style function to an `ol/layer/VectorTile` or `ol/layer/Vector`
 * with an `ol/source/VectorTile` or an `ol/source/Vector`. If the layer does not have a source
 * yet, it will be created and populated from the information in the `glStyle` (unless `updateSource` is
 * set to `false`).
 *
 * **Example:**
 * ```js
 * import {applyStyle} from 'ol-mapbox-style';
 * import {VectorTile} from 'ol/layer.js';
 *
 * const layer = new VectorTile({declutter: true});
 * applyStyle(layer, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
 * ```
 *
 * The style function will render all layers from the `glStyle` object that use the source
 * of the first layer, the specified `source`, or a subset of layers from the same source. The
 * source needs to be a `"type": "vector"` or `"type": "geojson"` source.
 *
 * Two additional properties will be set on the provided layer:
 *
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * @param {VectorTileLayer|VectorLayer} layer OpenLayers layer. When the layer has a source configured,
 * it will be modified to use the configuration from the glStyle's `source`. Options specified on the
 * layer's source will override those from the glStyle's `source`, except for `url` and
 * `tileUrlFunction`. When the source projection is the default (`EPSG:3857`), the `tileGrid` will
 * also be overridden. If you'd rather not have ol-mapbox-style modify the source, configure `applyStyle()`
 * with the `updateSource: false` option.
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string|Array<string>|Options&ApplyStyleOptions} [sourceOrLayersOrOptions] Options or
 * `source` key or an array of layer `id`s from the Mapbox Style object. When a `source` key is
 * provided, all layers for the specified source will be included in the style function. When layer
 * `id`s are provided, they must be from layers that use the same source. When not provided or a falsey
 * value, all layers using the first source specified in the glStyle will be rendered.
 * @param {Options&ApplyStyleOptions|string} [optionsOrPath] **Deprecated**. Options. Alternatively the path of the style file
 * (only required when a relative path is used for the `"sprite"` property of the style).
 * @param {Array<number>} [resolutions] **Deprecated**. Resolutions for mapping resolution to zoom level.
 * Only needed when working with non-standard tile grids or projections, can also be supplied with
 * options.
 * @return {Promise} Promise which will be resolved when the style can be used
 * for rendering.
 */
export function applyStyle(layer: VectorTileLayer | VectorLayer<any>, glStyle: string | any, sourceOrLayersOrOptions?: string | string[] | (Options & ApplyStyleOptions) | undefined, optionsOrPath?: string | (Options & ApplyStyleOptions) | undefined, resolutions?: number[] | undefined): Promise<any>;
/**
 * Applies properties of the Mapbox Style's first `background` layer to the
 * provided map or layer (group).
 *
 * **Example:**
 * ```js
 * import {applyBackground} from 'ol-mapbox-style';
 * import {Map} from 'ol';
 *
 * const map = new Map({target: 'map'});
 * applyBackground(map, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
 * ```
 * @param {Map|import("ol/layer/Base.js").default} mapOrLayer OpenLayers Map or layer (group).
 * @param {Object|string} glStyle Mapbox Style object or url.
 * @param {Options} options Options.
 * @return {Promise} Promise that resolves when the background is applied.
 */
export function applyBackground(mapOrLayer: Map | import("ol/layer/Base.js").default, glStyle: any | string, options?: Options): Promise<any>;
/**
 * Creates an OpenLayers VectorTile source for a gl source entry.
 * @param {Object} glSource "source" entry from a Mapbox Style object.
 * @param {string|undefined} styleUrl URL to use for the source. This is expected to be the complete http(s) url,
 * with access key applied.
 * @param {Options} options Options.
 * @return {Promise<import("ol/source/VectorTile").default>} Promise resolving to a VectorTile source.
 * @private
 */
export function setupVectorSource(glSource: any, styleUrl: string | undefined, options: Options): Promise<import("ol/source/VectorTile").default>;
export function setupLayer(glStyle: any, styleUrl: any, glLayer: any, options: any): Layer<Source, import("ol/renderer/Layer.js").default<any>> | VectorTileLayer | TileLayer<import("ol/source/Tile.js").default> | ImageLayer<Raster> | undefined;
/**
 * Loads and applies a Mapbox Style object into an OpenLayers Map or LayerGroup.
 * This includes the map background, the layers, and for Map instances that did not
 * have a View defined yet also the center and the zoom.
 *
 * **Example:**
 * ```js
 * import apply from 'ol-mapbox-style';
 *
 * apply('map', 'mapbox://styles/mapbox/bright-v9', {accessToken: 'YOUR_MAPBOX_TOKEN'});
 * ```
 *
 * The center and zoom will only be set if present in the Mapbox Style document,
 * and if not already set on the OpenLayers map.
 *
 * Layers will be added to the OpenLayers map, without affecting any layers that
 * might already be set on the map.
 *
 * Layers added by `apply()` will have two additional properties:
 *
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * This function sets an additional `mapbox-style` property on the OpenLayers
 * Map or LayerGroup instance, which holds the Mapbox Style object.
 *
 * @param {Map|HTMLElement|string|LayerGroup} mapOrGroupOrElement Either an existing
 * OpenLayers Map instance, or a HTML element, or the id of a HTML element that will be
 * the target of a new OpenLayers Map, or a layer group. If layer group, styles
 * releated to the map and view will be ignored.
 * @param {string|Object} style JSON style object or style url pointing to a
 * Mapbox Style object. When using Mapbox APIs, the url is the `styleUrl`
 * shown in Mapbox Studio's "share" panel. In addition, the `accessToken` option
 * (see below) must be set.
 * When passed as JSON style object, all OpenLayers layers created by `apply()`
 * will be immediately available, but they may not have a source yet (i.e. when
 * they are defined by a TileJSON url in the Mapbox Style document). When passed
 * as style url, layers will be added to the map when the Mapbox Style document
 * is loaded and parsed.
 * @param {Options} options Options.
 * @return {Promise<Map|LayerGroup>} A promise that resolves after all layers have been added to
 * the OpenLayers Map instance or LayerGroup, their sources set, and their styles applied. The
 * `resolve` callback will be called with the OpenLayers Map instance or LayerGroup as
 * argument.
 */
export function apply(mapOrGroupOrElement: Map | HTMLElement | string | LayerGroup, style: string | any, options?: Options): Promise<Map | LayerGroup>;
/**
 * If layerIds is not empty, applies the style specified in glStyle to the layer,
 * and adds the layer to the map.
 *
 * The layer may not yet have a source when the function is called.  If so, the style
 * is applied to the layer via a once listener on the 'change:source' event.
 *
 * @param {Layer} layer An OpenLayers layer instance.
 * @param {Array<string>} layerIds Array containing layer ids of already-processed layers.
 * @param {Object} glStyle Style as a JSON object.
 * @param {string|undefined} styleUrl The original style URL. Only required
 * when a relative path is used with the `"sprite"` property of the style.
 * @param {Map|LayerGroup} mapOrGroup OpenLayers Map.
 * @param {Options} options Options.
 * @return {Promise} Returns a promise that resolves after the source has
 * been set on the specified layer, and the style has been applied.
 */
export function finalizeLayer(layer: Layer, layerIds: Array<string>, glStyle: any, styleUrl: string | undefined, mapOrGroup: Map | LayerGroup, options?: Options): Promise<any>;
export type Options = {
    /**
     * Access token for 'mapbox://' urls.
     */
    accessToken?: string | undefined;
    /**
     * Function for controlling how `ol-mapbox-style` fetches resources. Can be used for modifying
     * the url, adding headers or setting credentials options. Called with the url and the resource
     * type as arguments, this function is supposed to return a `Request` object. Without a return value,
     * the original request will not be modified. For `Tiles` and `GeoJSON` resources, only the `url` of
     * the returned request will be respected.
     */
    transformRequest?: ((arg0: string, arg1: ResourceType) => (Request | void)) | undefined;
    /**
     * Only useful when working with non-standard projections.
     * Code of a projection registered with OpenLayers. All sources of the style must be provided in this
     * projection. The projection must also have a valid extent defined, which will be used to determine the
     * origin and resolutions of the tile grid for all tiled sources of the style. When provided, the bbox
     * placeholder in tile and geojson urls changes: the default is `{bbox-epsg-3857}`, when projection is e.g.
     * set to `EPSG:4326`, the bbox placeholder will be `{bbox-epsg-4326}`.
     */
    projection?: string | undefined;
    /**
     * Only useful when working with non-standard projections.
     * Resolutions for mapping resolution to the `zoom` used in the Mapbox style.
     */
    resolutions?: number[] | undefined;
    /**
     * URL of the Mapbox GL style. Required for styles that were provided
     * as object, when they contain a relative sprite url, or sources referencing data by relative url.
     */
    styleUrl?: string | undefined;
    /**
     * Function that returns an image for an icon name. If the result is an HTMLImageElement, it must already be
     * loaded. The layer can be used to call layer.changed() when the loading and processing of the image has finished.
     * This function be used for icons not in the sprite or to override sprite icons.
     */
    getImage?: ((arg0: VectorLayer<any> | VectorTileLayer, arg1: string) => HTMLImageElement | HTMLCanvasElement | string | undefined) | undefined;
    /**
     * Access token param. For internal use.
     */
    accessTokenParam?: string | undefined;
};
export type ApplyStyleOptions = {
    /**
     * Source. Default is `''`, which causes the first source in the
     * style to be used.
     */
    source?: string | undefined;
    /**
     * Layers. If no source is provided, the layers with the
     * provided ids will be used from the style's `layers` array. All layers need to use the same source.
     */
    layers?: string[] | undefined;
    /**
     * Update or create vector (tile) layer source with parameters
     * specified for the source in the mapbox style definition.
     */
    updateSource?: boolean | undefined;
};
export type ResourceType = 'Style' | 'Source' | 'Sprite' | 'SpriteImage' | 'Tiles' | 'GeoJSON';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorLayer from 'ol/layer/Vector.js';
import Map from 'ol/Map.js';
import Source from 'ol/source/Source.js';
import Layer from 'ol/layer/Layer.js';
import TileLayer from 'ol/layer/Tile.js';
import Raster from 'ol/source/Raster.js';
import ImageLayer from 'ol/layer/Image.js';
import LayerGroup from 'ol/layer/Group.js';
