import 'package:canil_eduardo/core/utils/fonts.dart';
import 'package:canil_eduardo/core/utils/img_path.dart';
import 'package:canil_eduardo/core/widgets/pet_form.dart';
import 'package:canil_eduardo/core/widgets/pet_shop_contact.dart';
import 'package:canil_eduardo/home/controller/home_controller.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.controller});

  final HomeController controller;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  HomeController get controller => widget.controller;

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(
              ImgPath.background,
            ),
            fit: BoxFit.fill,
          ),
        ),
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  minHeight: constraints.maxHeight,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Image.asset(ImgPath.title),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        const Spacer(
                          flex: 2,
                        ),
                        PetShopContact(
                          imgPath: ImgPath.pet1,
                          onPressed: () {},
                        ),
                        const Spacer(),
                        PetShopContact(
                          imgPath: ImgPath.pet2,
                          onPressed: () {},
                        ),
                        const Spacer(),
                        PetShopContact(
                          imgPath: ImgPath.pet3,
                          onPressed: () {},
                        ),
                        const Spacer(
                          flex: 2,
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 16,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        const Spacer(),
                        Flexible(
                          child: SizedBox(
                            width: 300,
                            child: PetForm(
                              controller: controller,
                            ),
                          ),
                        ),
                        const SizedBox(
                          width: 16,
                        ),
                        Flexible(
                          flex: 2,
                          child: Center(
                            child: ValueListenableBuilder<bool>(
                              valueListenable: controller.loading,
                              builder: (context, value, child) {
                                return value
                                    ? const CircularProgressIndicator()
                                    : ValueListenableBuilder<String>(
                                        valueListenable: controller.resultText,
                                        builder: (context, value, child) {
                                          return Text(
                                            value,
                                            style: Fonts.body32Bold,
                                          );
                                        },
                                      );
                              },
                            ),
                          ),
                        ),
                        const Spacer(),
                      ],
                    ),
                    const SizedBox(
                      height: 64,
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
