interface WebpackConfig {
  cache?: boolean;
  mode?: string;
  target?: string;
  devtool?: string;
  entry: any;
  externals?: any;
  output: any;
  module?: any;
  plugins?: Array<any>;
  optimization?: any;
  resolve?: {
    extensions?: Array<string>;
  };
  devServer?: {
    contentBase?: string;
    port?: number;
    historyApiFallback?: { [key: string]: boolean } | boolean;
    hot?: boolean;
    inline?: boolean;
    proxy?: any;
    host?: string;
    stats?: string;
    quiet?: boolean;
    noInfo?: boolean;
    watchOptions?: any;
  };
  performance?: {
    hints?: boolean;
  };
  node?: {
    process?: boolean;
    global?: boolean;
    Buffer?: boolean;
    crypto?: boolean;
    module?: boolean;
    clearImmediate?: boolean;
    setImmediate?: boolean;
    clearTimeout?: boolean;
    fs?: string;
    setTimeout?: boolean;
    net?: string;
    __dirname?: boolean;
    __filename?: boolean;
    child_process: string;
  };
}
