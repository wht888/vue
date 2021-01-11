<!--
imgUrl 当前显示图片路径
imglist必须为数组两种传值方式
1、['http://baidu.com'] 数组里边直接是图片地址
2、[{url: 'http://baidu.com', name: '图片名称'}] // 数组是数组对象，url为图片地址，name为图片名称
-->
<template>
  <div>
    <el-image
      :src="imgUrl || list[0]"
      :preview-src-list="list"
      @click="
        () => {
          clickImg();
        }
      "
    ></el-image>
    <div class="file-name" v-show="nameVisible">
      <span v-if="imgList.length && imgList[0].name">{{
        imgList[index].name
      }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PriviewImg',
  props: {
    imgList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    imgUrl: {
      type: String
    }
  },
  data() {
    return {
      // 图片显示的list
      list: [],
      // 当前显示的索引
      index: 0,
      // 是否显示图片名称
      nameVisible: false
    };
  },
  created() {
    this.setList();
  },
  methods: {
    // 点击放大图片
    clickImg() {
      this.nameVisible = true;
      const timeStr = 300;
      setTimeout(() => {
        const eles = document.getElementsByClassName('el-icon-circle-close'),
          prevs = document.getElementsByClassName('el-image-viewer__prev'),
          nexts = document.getElementsByClassName('el-image-viewer__next'),
          len = this.imgList.length,
          one = 1,
          [ele] = eles,
          [prev] = eles,
          [next] = eles;

        if (eles.length) {
          ele.addEventListener('click', () => {
            this.nameVisible = false;
          });
        }

        if (prevs.length) {
          prev.addEventListener('click', () => {
            if (!this.index) {
              this.index = len - one;
              return false;
            }
            this.index -= 1;
            return true;
          });
        }
        if (nexts.length) {
          next.addEventListener('click', () => {
            if (this.index === len - one) {
              this.index = 0;
            } else {
              this.index += 1;
            }
          });
        }
      }, timeStr);
    },

    // 设置需要显示的list
    setList() {
      this.imgList.map((item, index) => {
        if (item.url) {
          this.list.push(item.url);
          if (item.url === this.imgUrl) {
            this.index = index;
          }
        } else {
          this.list.push(item);
          if (item === this.imgUrl) {
            this.index = index;
          }
        }
        return item;
      });
    }
  }
};
</script>
<style scoped lang="scss">
.file-name {
  text-align: center;
  margin: 200px center;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 100px;
  z-index: 9999;
  span {
    padding: 10px 20px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 4px;
  }
}
</style>
