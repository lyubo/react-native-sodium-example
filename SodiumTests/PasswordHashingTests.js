import React, { Component } from 'react'
import {ScrollView, Text, View} from 'react-native'

import Base64 from 'base64-js'
import Sodium from 'react-native-sodium'

import {BasicTest} from './BasicTest'

export default class Test extends BasicTest {

  constructor(props) {
    super(props)
  }

  async _testPwHash1() {
    const tests = [
      { passwd_hex:
          "a347ae92bce9f80f6f595a4480fc9c2fe7e7d7148d371e9487d75f5c23008ffae0" +
          "65577a928febd9b1973a5a95073acdbeb6a030cfc0d79caa2dc5cd011cef02c08d" +
          "a232d76d52dfbca38ca8dcbd665b17d1665f7cf5fe59772ec909733b24de97d6f5" +
          "8d220b20c60d7c07ec1fd93c52c31020300c6c1facd77937a597c7a6",
        salt_hex:"5541fbc995d5c197ba290346d2c559dedf405cf97e5f95482143202f9e74f5c2",
        outlen:155, opslimit:5, memlimit:7256678,
        out_hex:
          "23b803c84eaa25f4b44634cc1e5e37792c53fcd9b1eb20f865329c68e09cbfa9f1" +
          "968757901b383fce221afe27713f97914a041395bbe1fb70e079e5bed2c7145b1f" +
          "6154046f5958e9b1b29055454e264d1f2231c316f26be2e3738e83a80315e9a095" +
          "1ce4b137b52e7d5ee7b37f7d936dcee51362bcf792595e3c896ad5042734fc90c9" +
          "2cae572ce63ff659a2f7974a3bd730d04d525d253ccc38"
      },
      { passwd_hex:
          "e125cee61c8cb7778d9e5ad0a6f5d978ce9f84de213a8556d9ffe202020ab4a6ed" +
          "9074a4eb3416f9b168f137510f3a30b70b96cbfa219ff99f6c6eaffb15c06b60e0" +
          "0cc2890277f0fd3c622115772f7048adaebed86e",
        salt_hex:"f1192dd5dc2368b9cd421338b22433455ee0a3699f9379a08b9650ea2c126f0d",
        outlen:250, opslimit:4, memlimit:7849083,
        out_hex:
          "0bb3769b064b9c43a9460476ab38c4a9a2470d55d4c992c6e723af895e4c07c09a" +
          "f41f22f90eab583a0c362d177f4677f212482fd145bfb9ac6211635e48461122bb" +
          "49097b5fb0739d2cd22a39bf03d268e7495d4fd8d710aa156202f0a06e932ff513" +
          "e6e7c76a4e98b6df5cf922f124791b1076ad904e6897271f5d7d24c5929e2a3b83" +
          "6d0f2f2697c2d758ee79bf1264f3fae65f3744e0f6d7d07ef6e8b35b70c0f88e90" +
          "36325bfb24ac7f550351486da87aef10d6b0cb77d1cf6e31cf98399c6f241c605c" +
          "6530dffb4764784f6c0b0bf601d4e4431e8b18dabdc3079c6e264302ade79f61cb" +
          "d5497c95486340bb891a737223100be0429650"
      },
      { passwd_hex:
          "92263cbf6ac376499f68a4289d3bb59e5a22335eba63a32e6410249155b956b6a3" +
          "b48d4a44906b18b897127300b375b8f834f1ceffc70880a885f47c33876717e392" +
          "be57f7da3ae58da4fd1f43daa7e44bb82d3717af4319349c24cd31e46d295856b0" +
          "441b6b289992a11ced1cc3bf3011604590244a3eb737ff221129215e4e4347f491" +
          "5d41292b5173d196eb9add693be5319fdadc242906178bb6c0286c9b6ca6012746" +
          "711f58c8c392016b2fdfc09c64f0f6b6ab7b",
        salt_hex:"3b840e20e9555e9fb031c4ba1f1747ce25cc1d0ff664be676b9b4a90641ff194",
        outlen:249, opslimit:3, memlimit:7994791,
        out_hex:
          "e9aa073b0b872f15c083d1d7ce52c09f493b827ca78f13a06c1721b45b1e17b24c" +
          "04e19fe869333135360197a7eb55994fee3e8d9680aedfdf7674f3ad7b84d59d7e" +
          "ab03579ffc10c7093093bc48ec84252aa1b30f40f5e838f1443e15e2772a39f4e7" +
          "74eb052097e8881e94f15457b779fa2af2bbc9a993687657c7704ac8a37c25c1df" +
          "4289eb4c70da45f2fd46bc0f78259767d3dd478a7c369cf866758bc36d9bd8e2e3" +
          "c9fb0cf7fd6073ebf630c1f67fa7d303c07da40b36749d157ea37965fef810f2ea" +
          "05ae6fc7d96a8f3470d73e15b22b42e8d6986dbfe5303256b2b3560372c4452ffb" +
          "2a04fb7c6691489f70cb46831be0679117f7"
      },
      { passwd_hex:
          "027b6d8e8c8c474e9b69c7d9ed4f9971e8e1ce2f6ba95048414c3970f0f09b70e3" +
          "b6c5ae05872b3d8678705b7d381829c351a5a9c88c233569b35d6b0b809df44b64" +
          "51a9c273f1150e2ef8a0b5437eb701e373474cd44b97ef0248ebce2ca0400e1b53" +
          "f3d86221eca3f18eb45b702b9172440f774a82cbf1f6f525df30a6e293c873cce6" +
          "9bb078ed1f0d31e7f9b8062409f37f19f8550aae",
        salt_hex:"eb2a3056a09ad2d7d7f975bcd707598f24cd32518cde3069f2e403b34bfee8a5",
        outlen:5,opslimit:4, memlimit:1397645,
        out_hex:null // [tv] pwhash failure (maybe intentional): [3]
      },
      { passwd_hex:
          "4a857e2ee8aa9b6056f2424e84d24a72473378906ee04a46cb05311502d5250b82" +
          "ad86b83c8f20a23dbb74f6da60b0b6ecffd67134d45946ac8ebfb3064294bc097d" +
          "43ced68642bfb8bbbdd0f50b30118f5e",
        salt_hex:"39d82eef32010b8b79cc5ba88ed539fbaba741100f2edbeca7cc171ffeabf258",
        outlen:190, opslimit:3, memlimit:1432947,
        out_hex:
          "c121209f0ba70aed93d49200e5dc82cce013cef25ea31e160bf8db3cf448a59d1a" +
          "56f6c19259e18ea020553cb75781761d112b2d949a297584c65e60df95ad89c410" +
          "9825a3171dc6f20b1fd6b0cdfd194861bc2b414295bee5c6c52619e544abce7d52" +
          "0659c3d51de2c60e89948d830695ab38dcb75dd7ab06a4770dd4bc7c8f335519e0" +
          "4b038416b1a7dbd25c026786a8105c5ffe7a0931364f0376ae5772be39b51d91d3" +
          "281464e0f3a128e7155a68e87cf79626ffca0b2a3022fc8420"
      },
      { passwd_hex:
          "c7b09aec680e7b42fedd7fc792e78b2f6c1bea8f4a884320b648f81e8cf515e8ba" +
          "9dcfb11d43c4aae114c1734aa69ca82d44998365db9c93744fa28b63fd16000e82" +
          "61cbbe083e7e2da1e5f696bde0834fe53146d7e0e35e7de9920d041f5a5621aabe" +
          "02da3e2b09b405b77937efef3197bd5772e41fdb73fb5294478e45208063b5f58e" +
          "089dbeb6d6342a909c1307b3fff5fe2cf4da56bdae50848f",
        salt_hex:"039c056d933b475032777edbaffac50f143f64c123329ed9cf59e3b65d3f43b6",
        outlen:178, opslimit:3, memlimit:4886999,
        out_hex:
          "91c337ce8918a5805a59b00bd1819d3eb4356807cbd2a80b271c4b482dce03f5b0" +
          "2ae4eb831ff668cbb327b93c300b41da4852e5547bea8342d518dd9311aaeb5f90" +
          "eccf66d548f9275631f0b1fd4b299cec5d2e86a59e55dc7b3afab6204447b21d1e" +
          "f1da824abaf31a25a0d6135c4fe81d34a06816c8a6eab19141f5687108500f3719" +
          "a862af8c5fee36e130c69921e11ce83dfc72c5ec3b862c1bccc5fd63ad57f432fb" +
          "cca6f9e18d5a59015950cdf053"
      },
      { passwd_hex:
          "b540beb016a5366524d4605156493f9874514a5aa58818cd0c6dfffaa9e90205f1" +
          "7b",
        salt_hex:"44071f6d181561670bda728d43fb79b443bb805afdebaf98622b5165e01b15fb",
        outlen:231, opslimit:1, memlimit:1631659,
        out_hex:null // [tv] pwhash failure (maybe intentional): [6]
      },
      { passwd_hex:
          "a14975c26c088755a8b715ff2528d647cd343987fcf4aa25e7194a8417fb2b4b3f" +
          "7268da9f3182b4cfb22d138b2749d673a47ecc7525dd15a0a3c66046971784bb63" +
          "d7eae24cc84f2631712075a10e10a96b0e0ee67c43e01c423cb9c44e5371017e9c" +
          "496956b632158da3fe12addecb88912e6759bc37f9af2f45af72c5cae3b179ffb6" +
          "76a697de6ebe45cd4c16d4a9d642d29ddc0186a0a48cb6cd62bfc3dd229d313b30" +
          "1560971e740e2cf1f99a9a090a5b283f35475057e96d7064e2e0fc81984591068d" +
          "55a3b4169f22cccb0745a2689407ea1901a0a766eb99",
        salt_hex:"3d968b2752b8838431165059319f3ff8910b7b8ecb54ea01d3f54769e9d98daf",
        outlen:167, opslimit:3, memlimit:1784128,
        out_hex:
          "e942951dfbc2d508294b10f9e97b47d0cd04e668a043cb95679cc1139df7c27cd5" +
          "4367688725be9d069f5704c12223e7e4ca181fbd0bed18bb4634795e545a6c04a7" +
          "306933a41a794baedbb628d41bc285e0b9084055ae136f6b63624c874f5a1e1d8b" +
          "e7b0b7227a171d2d7ed578d88bfdcf18323198962d0dcad4126fd3f21adeb1e11d" +
          "66252ea0c58c91696e91031bfdcc2a9dc0e028d17b9705ba2d7bcdcd1e3ba75b4b" +
          "1fea"
      },
      { passwd_hex:
          "a347ae92bce9f80f6f595a4480fc9c2fe7e7d7148d371e9487d75f5c23008ffae0" +
          "65577a928febd9b1973a5a95073acdbeb6a030cfc0d79caa2dc5cd011cef02c08d" +
          "a232d76d52dfbca38ca8dcbd665b17d1665f7cf5fe59772ec909733b24de97d6f5" +
          "8d220b20c60d7c07ec1fd93c52c31020300c6c1facd77937a597c7a6",
        salt_hex:"5541fbc995d5c197ba290346d2c559dedf405cf97e5f95482143202f9e74f5c2",
        outlen:155, opslimit:4, memlimit:397645,
        out_hex:
          "fd329873387429cb79faaec4f65c35649f65de0aabc1f092ca9dee20029d8ae6c3" +
          "a97e9940763e1703a7fef5a20eb7f210123fc8c6d3f1745d19d5e3c1eb392ab4a6" +
          "070c8a6b9ecbeabae0711326e81530099541a882d4bd7733c4a7477ae72b6928c4" +
          "6cd07264172a9d2cfb7d649594f877f8b447d9c01b17996b85db5a71f733f8cc5f" +
          "d0436540a5b7a1d79de09e20c3abe6515501b3156cd51e"
      },
      { passwd_hex:
          "a347ae92bce9f80f6f595a4480fc9c2fe7e7d7148d371e9487d75f5c23008ffae0" +
          "65577a928febd9b1973a5a95073acdbeb6a030cfc0d79caa2dc5cd011cef02c08d" +
          "a232d76d52dfbca38ca8dcbd665b17d1665f7cf5fe59772ec909733b24de97d6f5" +
          "8d220b20c60d7c07ec1fd93c52c31020300c6c1facd77937a597c7a6",
        salt_hex:"5541fbc995d5c197ba290346d2c559dedf405cf97e5f95482143202f9e74f5c2",
        outlen:155, opslimit:3, memlimit:397645,
        out_hex:
          "bbbc4c7963593601d4d685ed9d89682374f8e6b3ce92ce8ccc702728ec8bf839fd" +
          "7cb8e37ddb09be8c18c7e0ed099949665227a00fb33e1f63ca830dbeb13b29d987" +
          "b445b3e081cd8428bdb2f9e003e12bea98230fd30842fa193af9169171b5503220" +
          "72c88330ea464cbe02b6ee044374d3f3d174c23617b707159a11926c56601123dc" +
          "c30508ec84fdb0797b7ab23a77eeefb2a0be2ef45e903c"
      },
    ]

    Promise.all(tests.map(t => {
      const passwd = Base64.fromByteArray(this.hex2bin(t.passwd_hex))
      const salt = Base64.fromByteArray(this.hex2bin(t.salt_hex))
      return Sodium.crypto_pwhash(t.outlen,passwd,salt,t.opslimit,t.memlimit,Sodium.crypto_pwhash_ALG_ARGON2I13)
        .then(out64 => t.out_hex === this.bin2hex(Base64.toByteArray(out64))).catch(e => {if (t.out_hex == null) return true;throw e})
    }))
    .then(results => this.testPassed('crypto_pwhash',results.find(t => t == false) == undefined?true:false))
    .catch((error) =>  this.testFailed('crypto_pwhash',error))
  }

  componentDidMount() {
    this.initTests([
      'crypto_pwhash'
    ])

    this._testPwHash1()
  }

}
