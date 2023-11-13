//
//  PortkeySDKPortkey.m
//  DoubleConversion
//
//  Created by wade-cui on 2023/9/26.
//

#import "PortkeySDKPortkey.h"
#import <PortkeySDK/PortkeySDKAccountModule.h>
#import <PortkeySDK/PortkeySDKConfigModule.h>

@interface PortkeySDKPortkey ()

@property (nonatomic, strong) id<PortkeySDKAccountProtocol> accountModule;
@property (nonatomic, strong, readwrite) id<PortkeySDKServiceProtocol> service;
@property (nonatomic, strong, readwrite) id<PortkeySDKConfigProtocol> config;

@end

@implementation PortkeySDKPortkey

+ (instancetype)portkey {
    static PortkeySDKPortkey *portkey = nil;
    static dispatch_once_t token;
    dispatch_once(&token, ^{
        portkey = [PortkeySDKPortkey new];
    });
    return portkey;
}

+ (void)initPortkey {
    
}

#pragma mark - Getter

- (id<PortkeySDKAccountProtocol>)accountModule {
    if (!_accountModule) {
        _accountModule = [PortkeySDKAccountModule new];
    }
    return _accountModule;
}

- (id<PortkeySDKConfigProtocol>)config {
    if (!_config) {
        _config = [PortkeySDKConfigModule new];
    }
    return _config;
}

@end
