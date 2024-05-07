const Controller = require('../core/base_controller');
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

// 上传图片
class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const uplaodBasePath = 'app/public/uploads';
    // 生成文件名
    const filename = `${Date.now()}${Number.parseInt(
      Math.random() * 1000
    )}${path.extname(file.filename).toLocaleLowerCase()}`;

    const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      }
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }

    mkdirsSync(path.join(uplaodBasePath, dirname));
    const target = path.join(uplaodBasePath, dirname, filename);
    // 保存文件到指定目录
    const fileData = fs.readFileSync(file.filepath);
    await fs.writeFileSync(target, fileData);
    // await fs.promises.writeFile(target, file.filepath);
    await ctx.cleanupRequestFiles(); // 清理临时文件

    this.success({
      url: `/public/uploads/${dirname}/${filename}`, // 假设你的静态文件服务挂载在/uploads路径下
    });
  }
}

module.exports = UploadController;
