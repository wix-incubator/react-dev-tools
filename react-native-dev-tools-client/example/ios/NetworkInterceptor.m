//
//  NetworkInterceptor.m
//  example
//
//  Created by Daniel Zlotin on 03/11/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "NetworkInterceptor.h"
#import "AppDelegate.h"
@import ObjectiveC;
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@interface NSURLSessionConfiguration (Swizzler)
@end

@implementation NSURLSessionConfiguration (Swizzler)

+ (NSURLSessionConfiguration *)__swz__defaultSessionConfiguration {
  NSURLSessionConfiguration* obj = [self __swz__defaultSessionConfiguration];
  obj.protocolClasses = @[[NetworkInterceptor class]];
  return obj;
}

+ (void)load {
  Method m1 = class_getClassMethod([NSURLSessionConfiguration class], @selector(defaultSessionConfiguration));
  Method m2 = class_getClassMethod([NSURLSessionConfiguration class], @selector(__swz__defaultSessionConfiguration));
  method_exchangeImplementations(m1, m2);
}

@end

@implementation NetworkInterceptor

+(BOOL)canInitWithRequest:(NSURLRequest *)request {
  [[AppDelegate instance].bridge.eventDispatcher sendAppEventWithName:@"NetworkInterceptor" body:@{
                                                                                                   @"url": request.URL.absoluteString,
                                                                                                   @"method": [request HTTPMethod]
                                                                                                   }];
  return false;
}

@end
